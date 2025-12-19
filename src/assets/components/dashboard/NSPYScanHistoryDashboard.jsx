import React, { useState, useEffect, useMemo } from 'react';
import { useNavigate } from 'react-router-dom';

import Header from '../acceuil/header';
import './dashboard.css';


const Icons = {
    History: ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" /></svg>,
    Reports: ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M9 17v-2m3 2v-4m3 4v-6m2 10H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" /></svg>,
    Search: ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="11" cy="11" r="8"></circle><line x1="21" y1="21" x2="16.65" y2="16.65"></line></svg>,
    Shield: ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z" /></svg>,
    Target: ({ className }) => <svg className={className} width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2"><circle cx="12" cy="12" r="10"></circle><circle cx="12" cy="12" r="6"></circle><circle cx="12" cy="12" r="2"></circle></svg>,
    Menu: ({ className, onClick }) => <svg onClick={onClick} className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="3" y1="12" x2="21" y2="12"></line><line x1="3" y1="6" x2="21" y2="6"></line><line x1="3" y1="18" x2="21" y2="18"></line></svg>,
    ArrowLeft: ({ className, onClick }) => <svg onClick={onClick} className={className} width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"><line x1="19" y1="12" x2="5" y2="12"></line><polyline points="12 19 5 12 12 5"></polyline></svg>
};


const normalizeStatus = (status) => {
    const s = (status || '').toLowerCase();
    if (['success', 'terminé', 'completed'].includes(s)) return 'success';
    if (['running', 'en cours', 'pending'].includes(s)) return 'running';
    if (['failed', 'échoué', 'error', 'échouée'].includes(s)) return 'failed';
    return 'unknown';
};

const getSeverityWeight = (severity) => {
    const s = (severity || '').toUpperCase();
    if (s.includes('CRIT')) return 100;
    if (s.includes('HIGH') || s.includes('ELEV')) return 60;
    if (s.includes('MED')) return 30;
    if (s.includes('LOWFAIB')) return 10;
    return 0;
};

const getWeightColor = (weight) => {
    if (weight >= 100) return 'badge-crit';
    if (weight >= 60) return 'badge-high';
    if (weight >= 30) return 'badge-mid';
    if (weight >= 10) return 'badge-low';
    return 'badge-none';
};

const NSPYScanHistoryDashboard = () => {
    const navigate = useNavigate();


    const [scans, setScans] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const [selectedId, setSelectedId] = useState(null);
    const [selectedDetail, setSelectedDetail] = useState(null);
    const [loadingDetail, setLoadingDetail] = useState(false);

    const [statusFilter, setStatusFilter] = useState('all');
    const [searchQuery, setSearchQuery] = useState('');


    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [isMobileDetailView, setIsMobileDetailView] = useState(false);


    useEffect(() => {
        const fetchList = async () => {
            const token = localStorage.getItem("token");
            if (!token) { navigate('/login'); return; }

            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/scans`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (res.status === 401) {
                    localStorage.removeItem("token");
                    navigate('/login');
                    return;
                }

                if (!res.ok) throw new Error("Erreur chargement scans");

                const data = await res.json();

                setScans(Array.isArray(data) ? data : []);
            } catch (err) {
                setError(err.message);
                console.error(err);
            } finally {
                setLoading(false);
            }
        };
        fetchList();
    }, [navigate]);


    useEffect(() => {
        if (!selectedId) {
            setSelectedDetail(null);
            setIsMobileDetailView(false);
            return;
        }


        if (window.innerWidth < 1024) {
            setIsMobileDetailView(true);
        }

        const fetchDetail = async () => {
            setLoadingDetail(true);
            const token = localStorage.getItem("token");
            try {
                const res = await fetch(`${import.meta.env.VITE_API_URL}/api/scans/${selectedId}`, {
                    headers: { Authorization: `Bearer ${token}` }
                });
                if (res.ok) {
                    const data = await res.json();
                    setSelectedDetail(data);
                }
            } catch (e) { console.error(e); }
            finally { setLoadingDetail(false); }
        };
        fetchDetail();
    }, [selectedId]);





    const filteredScans = useMemo(() => {
        return scans.filter(s => {
            const sNorm = normalizeStatus(s.status);
            const matchesStatus = statusFilter === 'all'
                ? true
                : (statusFilter === 'Terminé' ? sNorm === 'success' : sNorm === 'running');

            const q = searchQuery.toLowerCase();
            const matchesSearch = !q
                || (s.target || '').toLowerCase().includes(q)
                || (s.tool_type || '').toLowerCase().includes(q);

            return matchesStatus && matchesSearch;
        });
    }, [scans, statusFilter, searchQuery]);


    const stats = useMemo(() => {
        const total = scans.length;
        const success = scans.filter(s => normalizeStatus(s.status) === 'success').length;
        const critical = scans.filter(s => getSeverityWeight(s.severity) >= 100).length;
        return { total, success, critical };
    }, [scans]);


    const globalScore = useMemo(() => {
        const finishedScans = scans.filter(s => normalizeStatus(s.status) === 'success');
        if (finishedScans.length === 0) return { score: 0, label: 'N/A' };

        const totalRisk = finishedScans.reduce((acc, s) => acc + getSeverityWeight(s.severity), 0);
        const avgRisk = totalRisk / finishedScans.length;

        const rawScore = 1000 - (avgRisk * 10);
        const score = Math.max(0, Math.min(1000, Math.round(rawScore)));

        let label = "Critique";
        if (score >= 800) label = "Bonne sécurité";
        else if (score >= 500) label = "Moyen";

        return { score, label };
    }, [scans]);



    const handleGenerateReport = async () => {
        if (!selectedId) return;
        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/scans/${selectedId}/report`, {
                method: 'POST',
                headers: { Authorization: `Bearer ${token}` }
            });
            if (res.ok) {

                const blobRes = await fetch(`${import.meta.env.VITE_API_URL}/api/scans/${selectedId}/report/latest`, {
                    headers: { Authorization: `Bearer ${token}` }
                });

                if (blobRes.ok) {
                    const blob = await blobRes.blob();
                    const url = window.URL.createObjectURL(blob);
                    const a = document.createElement('a');
                    a.href = url;
                    a.download = `report_scan_${selectedId}.pdf`;
                    document.body.appendChild(a);
                    a.click();
                    document.body.removeChild(a);
                    window.URL.revokeObjectURL(url);
                    alert("Rapport généré et téléchargé avec succès !");
                } else {
                    alert("Rapport généré, mais échec du téléchargement automatique.");
                }
            } else {
                alert("Erreur lors de la génération.");
            }
        } catch (e) { console.error(e); alert("Erreur serveur."); }
    };

    const handleOpenReport = async () => {
        if (!selectedId) return;


        const newWindow = window.open('', '_blank');
        if (newWindow) {
            newWindow.document.write('<html><head><title>Chargement...</title></head><body style="display:flex;justify-content:center;align-items:center;height:100vh;margin:0;font-family:sans-serif;background:#f0f2f5;"><div><h2>Chargement du rapport...</h2><p>Veuillez patienter.</p></div></body></html>');
        } else {
            alert("Veuillez autoriser les pop-ups pour ouvrir le rapport.");
            return;
        }

        const token = localStorage.getItem("token");
        try {
            const res = await fetch(`${import.meta.env.VITE_API_URL}/api/scans/${selectedId}/report/latest`, {
                headers: { Authorization: `Bearer ${token}` }
            });

            if (res.ok) {
                const blob = await res.blob();
                const url = window.URL.createObjectURL(blob);


                newWindow.location.href = url;
            } else {
                newWindow.close();
                alert("Rapport introuvable. Avez-vous cliqué sur 'Générer le rapport' ?");
            }
        } catch (e) {
            if (newWindow) newWindow.close();
            console.error(e);
            alert("Erreur technique lors de l'ouverture du rapport.");
        }
    };

    const handleBackToList = () => {
        setIsMobileDetailView(false);
        setSelectedId(null);
    }


    return (
        <>
            <Header />
            <div className={`nspy-layout ${isMobileDetailView ? 'mobile-view-detail' : ''}`}>


                <aside className={`nspy-sidebar ${isSidebarOpen ? 'mobile-open' : ''}`}>
                    <div className="nspy-logo">
                        <h1>NSPY</h1>
                        <span>Security Center</span>
                    </div>

                    <nav className="nspy-nav">
                        <div className="nspy-nav-item active" onClick={() => setIsSidebarOpen(false)}>
                            <Icons.History />
                            <span>Historique scans</span>
                        </div>
                        <div className="nspy-nav-item" onClick={() => setIsSidebarOpen(false)}>
                            <Icons.Reports />
                            <span>Rapports générés</span>
                        </div>
                    </nav>


                </aside>


                {isSidebarOpen && <div style={{ position: 'fixed', inset: 0, background: 'rgba(0,0,0,0.5)', zIndex: 19 }} onClick={() => setIsSidebarOpen(false)}></div>}



                <main className="nspy-main">


                    <header className="nspy-header">
                        <button className="nspy-header-mobile-toggle" onClick={() => setIsSidebarOpen(!isSidebarOpen)}>
                            <Icons.Menu />
                        </button>

                        <div className="nspy-search">
                            <Icons.Search />
                            <input
                                type="text"
                                placeholder="Rechercher (IP, URL, type)..."
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                        </div>

                        <div className="nspy-header-actions">
                            <div className="nspy-score-pill">
                                <span style={{ marginRight: '8px', color: 'var(--c-text-secondary)' }}>Global Score :</span>
                                <span className="nspy-dot" style={{
                                    color: globalScore.score >= 800 ? '#10b981' :
                                        globalScore.score >= 500 ? '#f59e0b' : '#f43f5e'
                                }}></span>
                                <span>{globalScore.score} - {globalScore.label}</span>
                            </div>
                            <button className="nspy-btn-outline">Exporter</button>
                        </div>
                    </header>


                    <div className="nspy-content">


                        <div className="nspy-col-left">

                            <div className="nspy-stats">
                                <div className="nspy-card">
                                    <span className="nspy-stat-label">Scans Totaux</span>
                                    <span className="nspy-stat-value">{stats.total}</span>
                                </div>
                                <div className="nspy-card">
                                    <span className="nspy-stat-label">Réussis</span>
                                    <span className="nspy-stat-value" style={{ color: 'var(--c-success)' }}>{stats.success}</span>
                                </div>
                                <div className="nspy-card">
                                    <span className="nspy-stat-label">Critiques</span>
                                    <span className="nspy-stat-value" style={{ color: 'var(--c-danger)' }}>{stats.critical}</span>
                                </div>
                            </div>


                            <div className="nspy-filters">
                                {['all', 'Terminé', 'En cours'].map(f => (
                                    <div
                                        key={f}
                                        className={`nspy-pill ${statusFilter === f ? 'active' : ''}`}
                                        onClick={() => setStatusFilter(f)}
                                    >
                                        {f === 'all' ? 'Tous' : f === 'Terminé' ? 'Terminés' : 'En cours'}
                                    </div>
                                ))}
                            </div>


                            <div className="nspy-list">
                                {loading ? (
                                    Array(5).fill(0).map((_, i) => (
                                        <div key={i} className="nspy-row" style={{ pointerEvents: 'none' }}>
                                            <div className="skeleton sk-circle"></div>
                                            <div className="skeleton sk-text"></div>
                                            <div className="skeleton sk-text"></div>
                                            <div className="skeleton sk-text"></div>
                                        </div>
                                    ))
                                ) : filteredScans.length === 0 ? (
                                    <div style={{ padding: '2rem', textAlign: 'center', color: 'var(--c-text-muted)' }}>
                                        Aucun scan ne correspond à vos critères.
                                    </div>
                                ) : (
                                    filteredScans.map(scan => {
                                        const st = normalizeStatus(scan.status);
                                        const dotColor = st === 'success' ? '#10b981' : st === 'running' ? '#3b82f6' : '#f43f5e';

                                        return (
                                            <div
                                                key={scan.id}
                                                className={`nspy-row ${selectedId === scan.id ? 'selected' : ''}`}
                                                onClick={() => setSelectedId(scan.id)}
                                            >
                                                <div className="nspy-icon-box">
                                                    <Icons.Target />
                                                </div>
                                                <div className="nspy-cell-target" title={scan.target}>{scan.target || 'Cible inconnue'}</div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--c-text-muted)', textTransform: 'uppercase' }}>
                                                    {scan.tool_type || 'N/A'}
                                                </div>
                                                <div style={{ fontSize: '0.8rem', color: 'var(--c-text-secondary)' }}>
                                                    {scan.scan_date ? new Date(scan.scan_date).toLocaleDateString() : 'Date invalide'}
                                                </div>
                                                <div style={{ display: 'flex', alignItems: 'center', gap: '6px', fontSize: '0.8rem' }}>
                                                    <span className="nspy-dot" style={{ width: '6px', height: '6px', background: dotColor, animation: st === 'running' ? 'pulse 1s infinite' : 'none' }}></span>
                                                    {scan.status}
                                                </div>
                                                <div className={`nspy-badge ${getWeightColor(getSeverityWeight(scan.severity))}`}>
                                                    {scan.severity || 'AUCUNE'}
                                                </div>
                                            </div>
                                        );
                                    })
                                )}
                            </div>
                        </div>


                        <div className="nspy-col-right">
                            {isMobileDetailView && (
                                <button className="nspy-btn-outline" onClick={handleBackToList} style={{ marginBottom: '1rem', alignSelf: 'flex-start' }}>
                                    <Icons.ArrowLeft style={{ marginRight: '8px', verticalAlign: 'middle' }} />
                                    Retour
                                </button>
                            )}

                            {selectedId && selectedDetail ? (
                                <div className="nspy-preview">
                                    <div className="nspy-preview-header">
                                        <span style={{ fontSize: '0.7rem', textTransform: 'uppercase', color: 'var(--c-text-muted)' }}>DETAIL DU SCAN</span>
                                        <h2>{selectedDetail.scan?.target || 'Sans titre'}</h2>
                                        <div style={{ display: 'flex', gap: '8px', marginTop: '8px' }}>
                                            <span className="nspy-badge badge-none">{selectedDetail.scan?.tool_type}</span>
                                            <span className="nspy-badge badge-none">
                                                {selectedDetail.scan?.scan_date ? new Date(selectedDetail.scan.scan_date).toLocaleString() : '-'}
                                            </span>
                                        </div>
                                    </div>

                                    <div className="nspy-vuln-stats">
                                        <div className="nspy-vuln-box">
                                            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'white' }}>
                                                {selectedDetail.findings ? selectedDetail.findings.length : 0}
                                            </span>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)' }}>TOTAL</span>
                                        </div>
                                        <div className="nspy-vuln-box">
                                            <span style={{ display: 'block', fontSize: '1.5rem', fontWeight: 'bold', color: 'var(--c-danger)' }}>
                                                {selectedDetail.findings?.filter(f => ['CRITICAL', 'HIGH'].includes(f.severity)).length || 0}
                                            </span>
                                            <span style={{ fontSize: '0.7rem', color: 'var(--c-text-muted)' }}>CRITIQUES</span>
                                        </div>
                                    </div>

                                    <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
                                        <button className="nspy-btn-primary" onClick={handleGenerateReport}>
                                            Générer le rapport PDF
                                        </button>
                                        <button className="nspy-btn-outline" style={{ textAlign: 'center', width: '100%' }} onClick={handleOpenReport}>
                                            Ouvrir (Onglet)
                                        </button>
                                    </div>

                                    <div className="nspy-timeline">
                                        <div className="nspy-tl-item active">
                                            <div className="nspy-tl-dot"></div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)' }}>Scan terminé</div>
                                            <div style={{ fontSize: '0.75rem', color: 'var(--c-text-muted)' }}>Il y a quelques instants</div>
                                        </div>
                                        <div className="nspy-tl-item">
                                            <div className="nspy-tl-dot"></div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)' }}>Analyse en cours</div>
                                        </div>
                                        <div className="nspy-tl-item">
                                            <div className="nspy-tl-dot"></div>
                                            <div style={{ fontSize: '0.9rem', color: 'var(--c-text-secondary)' }}>Démarrage par Admin</div>
                                        </div>
                                    </div>
                                </div>
                            ) : (
                                <div className="nspy-preview" style={{ justifyContent: 'center', alignItems: 'center', opacity: 0.5, height: '400px' }}>
                                    <div style={{ textAlign: 'center' }}>
                                        <Icons.Shield className="sk-circle" style={{ width: '48px', height: '48px', color: 'var(--c-text-muted)', marginBottom: '1rem' }} />
                                        <p style={{ color: 'var(--c-text-muted)' }}>Sélectionnez un scan pour voir les détails</p>
                                    </div>
                                </div>
                            )}
                        </div>

                    </div>
                </main>
            </div>
        </>
    );
};

export default NSPYScanHistoryDashboard;
