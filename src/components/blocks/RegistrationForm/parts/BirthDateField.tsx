import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';

export const BirthDateField = () => (
    <div>
        <Label htmlFor="birthDate" required>
            Date of Birth
        </Label>

        <Input
            id="birthDate"
            type="date"
            autoComplete="bday"
            placeholder="Enter your date of birth"
        />
    </div>
);
