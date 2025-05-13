import React from 'react';
import { Input } from '../../../ui/Input';
import { Label } from '../../../ui/Label';

export const EmailField = () => (
    <div className="formGroup">
        <Label htmlFor="email" required>
            Email
        </Label>

        <Input
            id="email"
            type="text"
            autoComplete="email"
            placeholder="Enter your email"
        />
    </div>
);
