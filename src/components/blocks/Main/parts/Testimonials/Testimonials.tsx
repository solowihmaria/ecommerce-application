import { FaStar } from 'react-icons/fa';
import styles from './Testimonials.module.scss';
import customer1 from '../../../../../assets/images/customer1.jpg';
import customer2 from '../../../../../assets/images/customer2.jpg';
import customer3 from '../../../../../assets/images/customer3.jpg';

const testimonials = [
    {
        id: 'testimonial-1',
        name: 'Sophie Martin',
        location: 'Paris, France',
        rating: 5,
        text: 'The plants arrived in perfect condition and have transformed my balcony into a green oasis. The delivery was faster than expected!',
        image: customer1,
    },
    {
        id: 'testimonial-2',
        name: 'Luca Bianchi',
        location: 'Florence, Italy',
        rating: 5,
        text: "Excellent customer service helped me choose the right plants for my apartment's lighting conditions. Truly personalized experience.",
        image: customer2,
    },
    {
        id: 'testimonial-3',
        name: 'Emma Schmidt',
        location: 'Berlin, Germany',
        rating: 5,
        text: "I'm amazed by the quality of these plants. Even my difficult-to-grow Calathea is thriving with their care instructions.",
        image: customer3,
    },
];

export function Testimonials() {
    return (
        <section className={styles.testimonials}>
            <div className={styles.container}>
                <div className={styles.header}>
                    <h2 className={styles.title}>Trusted By Our Customers</h2>
                    <p className={styles.subtitle}>
                        Join thousands of happy plant parents who trust us with
                        their green spaces.
                    </p>
                </div>

                <div className={styles.grid}>
                    {testimonials.map((testimonial) => (
                        <div key={testimonial.id} className={styles.card}>
                            <div className={styles.cardContent}>
                                <div className={styles.authorHeader}>
                                    <div className={styles.authorInfo}>
                                        <img
                                            src={testimonial.image}
                                            alt={testimonial.name}
                                            className={styles.avatar}
                                        />
                                        <div className={styles.authorText}>
                                            <p className={styles.name}>
                                                {testimonial.name}
                                            </p>
                                            <p className={styles.location}>
                                                {testimonial.location}
                                            </p>
                                        </div>
                                    </div>
                                    <div className={styles.rating}>
                                        {[1, 2, 3, 4, 5].map((starNumber) => (
                                            <FaStar
                                                key={`${testimonial.id}-star-${starNumber}`}
                                                className={
                                                    starNumber <=
                                                    testimonial.rating
                                                        ? styles.starFilled
                                                        : styles.starEmpty
                                                }
                                            />
                                        ))}
                                    </div>
                                </div>

                                <p className={styles.text}>
                                    &quot;{testimonial.text}&quot;
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
