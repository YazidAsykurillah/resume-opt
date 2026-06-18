<?php

namespace App\Policies;

use App\Models\Resume;
use App\Models\User;

class ResumePolicy
{
    /**
     * Determine whether the user can view any models.
     */
    public function viewAny(User $user): bool
    {
        return $user->can('resume.view');
    }

    /**
     * Determine whether the user can view the model.
     */
    public function view(User $user, Resume $resume): bool
    {
        return $user->id === $resume->user_id;
    }

    /**
     * Determine whether the user can create models.
     */
    public function create(User $user): bool
    {
        return $user->can('resume.create');
    }

    /**
     * Determine whether the user can update the model.
     */
    public function update(User $user, Resume $resume): bool
    {
        return $user->id === $resume->user_id;
    }

    /**
     * Determine whether the user can delete the model.
     */
    public function delete(User $user, Resume $resume): bool
    {
        return $user->id === $resume->user_id && $user->can('resume.delete');
    }
}
