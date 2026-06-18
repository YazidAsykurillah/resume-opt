<?php

namespace App\Policies;

use App\Models\Analysis;
use App\Models\User;

class AnalysisPolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('analysis.view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Analysis $analysis): bool
    {
        return $user->id === $analysis->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('analysis.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Analysis $analysis): bool
    {
        return $user->id === $analysis->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Analysis $analysis): bool
    {
        return $user->id === $analysis->user_id;
    }
}
