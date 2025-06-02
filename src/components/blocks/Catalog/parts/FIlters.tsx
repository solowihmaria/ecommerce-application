import type { Filter } from '../../../../api/catalog/catalog.types';
import { Button } from '../../../ui/Button';
import { Heading } from '../../../ui/Heading';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';
import { Select } from '../../../ui/Select';
import styles from '../Catalog.module.scss';

interface FiltersProps {
    filters: Filter;
    setFilters: React.Dispatch<React.SetStateAction<Filter>>;
    resetFilters: () => void;
}

export const Filters = ({
    filters,
    setFilters,
    resetFilters,
}: FiltersProps) => {
    return (
        <div className={styles.filtersBlock}>
            <Heading level="h3">Filters</Heading>

            <div className={styles.filterGroup}>
                <Label htmlFor="care-level" className={styles.sortingLabel}>
                    Care level
                </Label>
                <Select
                    className={styles.select}
                    name="care-level"
                    value={filters.careLevel}
                    onChange={(event) =>
                        setFilters((prev) => ({
                            ...prev,
                            careLevel: event.target.value,
                        }))
                    }
                >
                    <option value="">Any</option>
                    <option value="easy">Easy</option>
                    <option value="medium">Medium</option>
                    <option value="hard">Hard</option>
                </Select>
            </div>

            <div className={styles.filterGroup}>
                <Label htmlFor="light" className={styles.sortingLabel}>
                    Light requirements
                </Label>
                <Select
                    className={styles.select}
                    name="light"
                    value={filters.light}
                    onChange={(event) =>
                        setFilters((prev) => ({
                            ...prev,
                            light: event.target.value,
                        }))
                    }
                >
                    <option value="">Any</option>
                    <option value="low">Low</option>
                    <option value="medium">Medium</option>
                    <option value="high">High</option>
                </Select>
            </div>

            <div className={styles.filterGroup}>
                <Label htmlFor="toxicity" className={styles.sortingLabel}>
                    Toxicity
                </Label>
                <Select
                    className={styles.select}
                    name="toxicity"
                    value={filters.toxicity}
                    onChange={(event) =>
                        setFilters((prev) => ({
                            ...prev,
                            toxicity: event.target.value,
                        }))
                    }
                >
                    <option value="">Any</option>
                    <option value="false">Safe</option>
                    <option value="true">Toxic</option>
                </Select>
            </div>

            <div className={styles.priceGroup}>
                <p>Price</p>
                <div className={styles.filterGroup}>
                    <Label htmlFor="price-from" className={styles.sortingLabel}>
                        from
                    </Label>
                    <Input
                        name="price-from"
                        type="number"
                        value={filters.priceRange[0]}
                        onChange={(event) =>
                            setFilters((prev) => ({
                                ...prev,
                                priceRange: [
                                    Number(event.target.value),
                                    prev.priceRange[1],
                                ],
                            }))
                        }
                    />

                    <Label htmlFor="price-to" className={styles.sortingLabel}>
                        to
                    </Label>
                    <Input
                        name="price-to"
                        type="number"
                        value={filters.priceRange[1]}
                        onChange={(event) =>
                            setFilters((prev) => ({
                                ...prev,
                                priceRange: [
                                    prev.priceRange[0],
                                    Number(event.target.value),
                                ],
                            }))
                        }
                    />
                </div>
            </div>

            <div className={styles.heightGroup}>
                <p>Height (cm)</p>
                <div className={styles.filterGroup}>
                    <Label
                        htmlFor="height-from"
                        className={styles.sortingLabel}
                    >
                        from
                    </Label>
                    <Input
                        name="height-from"
                        type="number"
                        value={filters.height[0]}
                        onChange={(event) =>
                            setFilters((prev) => ({
                                ...prev,
                                height: [
                                    Number(event.target.value),
                                    prev.height[1],
                                ],
                            }))
                        }
                    />
                    <Label htmlFor="height-to" className={styles.sortingLabel}>
                        to
                    </Label>
                    <Input
                        name="height-to"
                        type="number"
                        value={filters.height[1]}
                        onChange={(event) =>
                            setFilters((prev) => ({
                                ...prev,
                                height: [
                                    prev.height[0],
                                    Number(event.target.value),
                                ],
                            }))
                        }
                    />
                </div>
            </div>

            <Button
                className={styles.buttonReset}
                variant="outline"
                onClick={resetFilters}
            >
                Reset filters
            </Button>
        </div>
    );
};
