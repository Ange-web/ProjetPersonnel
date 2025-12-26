import React from 'react';
import './style.css';

const techStack = [
    { name: 'React', icon: '/icon/react.svg' },
    { name: 'JavaScript', icon: '/icon/javascript.svg' },
    { name: 'Node.js', icon: '/icon/nodedotjs.svg' },
    { name: 'Express', icon: '/icon/express.svg' },
    { name: 'PostgreSQL', icon: '/icon/postgresql.svg' },
    { name: 'Spring Boot', icon: '/icon/springboot.svg' },
    { name: 'Linux', icon: '/icon/linux.svg' },
    { name: 'Git', icon: '/icon/git.svg' },
    { name: 'Docker', icon: '/icon/docker.svg' },
    { name: 'Python', icon: '/icon/python.svg' },
    { name: 'PHP', icon: '/icon/php.svg' },
    { name: 'HTML5', icon: '/icon/html5.svg' },
    { name: 'CSS', icon: '/icon/css.svg' },
    { name: 'MariaDB', icon: '/icon/mariadb.svg' },
    { name: 'N8N', icon: '/icon/n8n.svg' },
    { name: 'Postman', icon: '/icon/postman.svg' }
];

const TechStackSection = () => {
    // Duplication de la liste pour l'effet de défilement infini (8 copies to ensure full coverage on 1920p+)
    const duplicatedStack = Array(8).fill(techStack).flat();

    return (
        <section className="tech-stack-section">
            <div className="tech-stack-track">
                {duplicatedStack.map((tech, index) => (
                    <div key={`${tech.name}-${index}`} className="tech-icon-wrapper" title={tech.name}>
                        <img
                            src={tech.icon}
                            alt={`${tech.name} logo`}
                            className="tech-icon"
                        />
                    </div>
                ))}
            </div>
        </section>
    );
};

export default TechStackSection;
