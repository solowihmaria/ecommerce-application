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
            bio: "I graduated with a degree in Information Systems and Technologies, where I discovered my true interest in frontend development. To deepen my knowledge, I enrolled in a course — and quickly fell in love with building user-friendly, responsive web interfaces. I'm excited to keep growing as a developer and take on new challenges in real-world projects.",
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
                { id: 'cont-1-7', text: '404 Page Implementation' },
                { id: 'cont-1-8', text: 'About Us Page Implementation' },
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
            bio: 'As a designer by education, I’ve always believed that truly great interfaces demand both visual polish and technical execution. That’s why I took the leap into coding—completing intensive training at RSSchool, where I studied React, JavaScript, and TypeScript. Now, I combine my design eye with development skills to build seamless, responsive applications from start to finish. What excites me most? Having end-to-end ownership—crafting not just how things look, but how they work—with pixel-perfect precision.',
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
                {
                    id: 'cont-2-7',
                    text: 'Cart Integration in Catalog',
                },
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
            bio: "I finished Belarusian State University of Informatics and Radioelectronics 6 years ago. After that I started my career in IT sphere as QA Engineer. Recently I've realized that I'd like to change direction in my career. I was always curious about applications, websites, how they work, and I understood that I'd like to learn how to create them. I joined FE development course in RS school. As result, for 7 months I’m developing my skills in JavaScript, TypeScript, and React, and I am excited to create intuitive, user-focused solutions.",
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
                { id: 'cont-3-7', text: 'Cart Page Implementation' },
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
