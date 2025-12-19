import React, { useState } from 'react';
import './ScanResultView.css';

const ScanResultView = ({ result }) => {
    if (!result) return null;

    const { scan, stats, findings, ipData, metadata } = result;
    const scanInfo = scan || {};
    const severity = scanInfo.severity || 'low';
    const status = scanInfo.status || 'completed';


    const formatDate = (dateStr) => {
        if (!dateStr) return '';
        return new Date(dateStr).toLocaleString('fr-FR', {
            day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit'
        });
    };

    return (
        <div className="scan-result-view">

            <div className="srv-header">
                <div className="srv-title-section">
                    <h3>Résultat d'analyse</h3>
                    {scanInfo.target && <div className="srv-target">{scanInfo.target}</div>}
                </div>
                <div className="srv-meta">
                    <span className={`srv-badge status-${status}`}>
                        {status === 'success' ? 'Succès' : status === 'failed' ? 'Échec' : status}
                    </span>
                    <span className={`srv-badge severity-${severity}`}>
                        {severity === 'critical' ? 'Critique' :
                            severity === 'high' ? 'Élevé' :
                                severity === 'medium' ? 'Moyen' :
                                    severity === 'low' ? 'Faible' : 'Info'}
                    </span>
                    {scanInfo.duration_ms && <span>{scanInfo.duration_ms}ms</span>}
                    {scanInfo.started_at && <span>{formatDate(scanInfo.started_at)}</span>}
                </div>
            </div>


            {status === 'failed' && scanInfo.error_message && (
                <div className="srv-error-message">
                    <strong>Erreur : </strong> {scanInfo.error_message}
                </div>
            )}


            {stats && (
                <div className="srv-stats">
                    <div className="srv-stat-item" style={{ borderColor: stats.critical_count > 0 ? '#ef4444' : 'transparent' }}>
                        <span className="srv-stat-val" style={{ color: '#f87171' }}>{stats.critical_count || 0}</span>
                        <span className="srv-stat-label">Critiques</span>
                    </div>
                    <div className="srv-stat-item" style={{ borderColor: stats.high_count > 0 ? '#f59e0b' : 'transparent' }}>
                        <span className="srv-stat-val" style={{ color: '#fbbf24' }}>{stats.high_count || 0}</span>
                        <span className="srv-stat-label">Élevées</span>
                    </div>
                    <div className="srv-stat-item">
                        <span className="srv-stat-val" style={{ color: '#38bdf8' }}>{stats.medium_count || 0}</span>
                        <span className="srv-stat-label">Moyennes</span>
                    </div>
                    <div className="srv-stat-item">
                        <span className="srv-stat-val" style={{ color: '#34d399' }}>{stats.low_count || 0}</span>
                        <span className="srv-stat-label">Faibles</span>
                    </div>
                </div>
            )}


            {ipData && (
                <div className="srv-findings">
                    <div className="srv-finding-card">
                        <div className="srv-finding-header">
                            <span className="srv-finding-title">Informations IP</span>
                        </div>
                        <div className="srv-finding-content">
                            <pre className="srv-evidence">{JSON.stringify(ipData, null, 2)}</pre>
                        </div>
                    </div>
                </div>
            )}

            {metadata && Object.keys(metadata).length > 0 && !findings && (
                <div className="srv-findings">
                    <div className="srv-finding-card">
                        <div className="srv-finding-header">
                            <span className="srv-finding-title">Métadonnées Extraites</span>
                        </div>
                        <div className="srv-finding-content">
                            <pre className="srv-evidence">{JSON.stringify(metadata, null, 2)}</pre>
                        </div>
                    </div>
                </div>
            )}


            {findings && findings.length > 0 && (
                <div className="srv-findings">
                    <h4 style={{ marginBottom: '10px', marginTop: '20px' }}>Vulnérabilités Détectées</h4>
                    {findings.map((finding, idx) => (
                        <FindingCard key={idx} finding={finding} />
                    ))}
                </div>
            )}

            {(!findings || findings.length === 0) && status === 'success' && !ipData && (!metadata || Object.keys(metadata).length === 0) && (
                <div style={{ textAlign: 'center', padding: '2rem', color: '#64748b' }}>
                    Aucune vulnérabilité ou donnée particulière détectée.
                </div>
            )}
        </div>
    );
};

const FindingCard = ({ finding }) => {
    const [expanded, setExpanded] = useState(false);
    const severity = finding.severity || 'info';

    return (
        <div className="srv-finding-card">
            <div className="srv-finding-header" onClick={() => setExpanded(!expanded)}>
                <div className="srv-finding-title-group">
                    <span className={`srv-badge severity-${severity}`} style={{ fontSize: '0.65rem' }}>
                        {severity.toUpperCase()}
                    </span>
                    <span className="srv-finding-title">{finding.title}</span>
                </div>
                <div className={`srv-chevron ${expanded ? 'expanded' : ''}`}>▼</div>
            </div>

            {expanded && (
                <div className="srv-finding-content">
                    {finding.description && (
                        <>
                            <div className="srv-section-title">Description</div>
                            <div className="srv-description">{finding.description}</div>
                        </>
                    )}

                    {finding.remediation && (
                        <>
                            <div className="srv-section-title">Remédiation</div>
                            <div className="srv-remediation">{finding.remediation}</div>
                        </>
                    )}

                    {finding.evidence && (
                        <>
                            <div className="srv-section-title">Preuve Technique</div>
                            <pre className="srv-evidence">
                                {typeof finding.evidence === 'object'
                                    ? JSON.stringify(finding.evidence, null, 2)
                                    : finding.evidence}
                            </pre>
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default ScanResultView;
