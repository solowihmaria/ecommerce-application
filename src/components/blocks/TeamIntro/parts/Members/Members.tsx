import { FiGithub } from 'react-icons/fi';
import {
    FaPalette,
    FaCode,
    FaServer,
    FaVial,
    FaExchangeAlt,
} from 'react-icons/fa';
import styles from './Members.module.scss';
import customer1 from '../../../../../assets/images/member1.jpg';
import customer2 from '../../../../../assets/images/member2.jpg';
import customer3 from '../../../../../assets/images/member3.jpg';

export const MembersSection = () => {
    const developmentAreas = [
        {
            id: 'area-design',
            icon: FaPalette,
            label: 'Design',
            className: styles.designBadge,
        },
        {
            id: 'area-frontend',
            icon: FaCode,
            label: 'Frontend',
            className: styles.frontendBadge,
        },
        {
            id: 'area-testing',
            icon: FaVial,
            label: 'Testing',
            className: styles.testingBadge,
        },
        {
            id: 'area-integration',
            icon: FaServer,
            label: 'API Integration',
            className: styles.integrationBadge,
        },
        {
            id: 'area-crosscheck',
            icon: FaExchangeAlt,
            label: 'Cross-Check',
            className: styles.crossCheckBadge,
        },
    ];

    const teamMembers = [
        {
            id: 'member-1',
            name: 'Maria Solovykh',
            role: 'Team Lead & Code Architect',
            bio: "I'm passionate about creating scalable web applications and mentoring developers. When I'm not coding, you'll find me exploring new technologies or enjoying a good cup of coffee. I believe in clean code, effective communication, and building products that users actually love to use.",
            photo: customer1,
            github: 'https://github.com/solowihmaria',
            contributions: [
                { id: 'cont-1-1', text: 'Task Board Setup' },
                {
                    id: 'cont-1-2',
                    text: 'CommerceTools Project and API Client Setup',
                },
                { id: 'cont-1-3', text: 'Login Page Implementation' },
                { id: 'cont-1-4', text: 'Routing Implementation' },
                { id: 'cont-1-5', text: 'User Profile Page Implementation' },
                { id: 'cont-1-6', text: 'Main Page Implementation' },
                { id: 'cont-1-7', text: 'About Us Page Implementation' },
                { id: 'cont-1-8', text: '------- 4 sprint' },
            ],

            areas: [
                'area-frontend',
                'area-integration',
                'area-crosscheck',
                'area-design',
                'area-testing',
            ],
        },
        {
            id: 'member-2',
            name: 'Alexandra Sharovatova',
            role: 'Design Wizard & UI Goddess',
            bio: "I'm a creative developer who loves turning ideas into beautiful, intuitive interfaces. My background in graphic design helps me bridge the gap between aesthetics and functionality. I'm obsessed with pixel-perfect designs and smooth user experiences that make people smile.",
            photo: customer2,
            github: 'https://github.com/asharovatova',
            contributions: [
                { id: 'cont-2-1', text: 'Comprehensive README' },
                { id: 'cont-2-2', text: 'Registration Page Implementation' },
                { id: 'cont-2-3', text: 'Routing Implementation' },
                { id: 'cont-2-4', text: 'Catalog Page Implementation' },
                { id: 'cont-2-5', text: 'Design Reference Research' },
                {
                    id: 'cont-2-6',
                    text: 'Product Data Management in CommerceTools',
                },
                { id: 'cont-2-7', text: '-----4 sprint' },
            ],
            areas: [
                'area-frontend',
                'area-integration',
                'area-crosscheck',
                'area-design',
                'area-testing',
            ],
        },
        {
            id: 'member-3',
            name: 'Viyaleta Batsura',
            role: 'QA Master & Bug Hunter',
            bio: "I'm a backend enthusiast who enjoys solving complex problems and ensuring everything runs smoothly behind the scenes. I have a keen eye for detail and love writing tests that catch bugs before users do. Database optimization and API design are my favorite challenges.",
            photo: customer3,
            github: 'https://github.com/violettab21',
            contributions: [
                {
                    id: 'cont-3-1',
                    text: 'Development Environment Configuration',
                },
                { id: 'cont-3-2', text: 'Header Implementation' },
                { id: 'cont-3-3', text: 'Routing Implementation' },
                {
                    id: 'cont-3-4',
                    text: 'Detailed Product Page Implementation',
                },
                {
                    id: 'cont-3-5',
                    text: 'Product Data Management in CommerceTools',
                },
                { id: 'cont-3-6', text: 'Unit and Integration Testing' },
                { id: 'cont-3-7', text: '----------- 4 sprint' },
            ],

            areas: [
                'area-frontend',
                'area-integration',
                'area-crosscheck',
                'area-design',
                'area-testing',
            ],
        },
    ];
    const developmentAreasMap = Object.fromEntries(
        developmentAreas.map((area) => [area.id, area])
    );

    return (
        <section className={styles.section}>
            <div className={styles.container}>
                <h1 className={styles.title}>Our Development Dream Team</h1>
                <div className={styles.teamGrid}>
                    {teamMembers.map((member) => (
                        <div
                            key={member.id}
                            className={`${styles.teamMember} ${member.id === 'member-2' ? styles.reverse : ''}`}
                        >
                            <div className={styles.photoCard}>
                                <div className={styles.photoWrapper}>
                                    <img
                                        src={member.photo}
                                        alt={member.name}
                                        className={styles.photo}
                                    />
                                    <div className={styles.nameOverlay}>
                                        <h3 className={styles.memberName}>
                                            {member.name}
                                        </h3>
                                        <p className={styles.memberRole}>
                                            {member.role}
                                        </p>
                                    </div>
                                </div>
                            </div>

                            <div className={styles.infoCard}>
                                <div className={styles.card}>
                                    <div className={styles.cardContent}>
                                        <div className={styles.areaLabels}>
                                            {member.areas.map((areaId) => {
                                                const area =
                                                    developmentAreasMap[areaId];
                                                if (!area) {
                                                    return null;
                                                }
                                                return (
                                                    <span
                                                        key={area.id}
                                                        className={`${styles.areaLabel} ${area.className}`}
                                                    >
                                                        <area.icon
                                                            className={
                                                                styles.labelIcon
                                                            }
                                                        />
                                                        {area.label}
                                                    </span>
                                                );
                                            })}
                                        </div>

                                        <div className={styles.bioSection}>
                                            <h4 className={styles.sectionTitle}>
                                                About
                                            </h4>
                                            <p className={styles.bioText}>
                                                {member.bio}
                                            </p>
                                        </div>

                                        <div
                                            className={
                                                styles.contributionsSection
                                            }
                                        >
                                            <h4 className={styles.sectionTitle}>
                                                Key Contributions
                                            </h4>
                                            <div
                                                className={
                                                    styles.contributionsGrid
                                                }
                                            >
                                                {member.contributions.map(
                                                    (contribution) => (
                                                        <div
                                                            key={
                                                                contribution.id
                                                            }
                                                            className={
                                                                styles.contributionItem
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.zapIcon
                                                                }
                                                            />
                                                            <span>
                                                                {
                                                                    contribution.text
                                                                }
                                                            </span>
                                                        </div>
                                                    )
                                                )}
                                            </div>
                                        </div>

                                        <button
                                            className={styles.githubButton}
                                            onClick={() =>
                                                window.open(
                                                    member.github,
                                                    '_blank'
                                                )
                                            }
                                        >
                                            <FiGithub
                                                className={styles.githubIcon}
                                            />
                                            GitHub Profile
                                        </button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
};
