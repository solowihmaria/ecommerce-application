import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';

export const LastNameField = () => (
    <div>
        <Label htmlFor="lastName" required>
            Last Name
        </Label>

        <Input
            id="lastName"
            type="text"
            autoComplete="family-name"
            placeholder="Your last name"
        />
    </div>
);
