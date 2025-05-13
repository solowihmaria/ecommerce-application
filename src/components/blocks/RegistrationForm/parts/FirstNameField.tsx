import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';

export const FirstNameField = () => (
    <div className="formGroup">
        <Label htmlFor="firstName" required>
            First Name
        </Label>

        <Input
            id="firstName"
            type="text"
            autoComplete="name"
            placeholder="Your first name"
        />
    </div>
);
