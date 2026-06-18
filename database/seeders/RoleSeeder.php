<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;
use Spatie\Permission\Models\Role;
use Spatie\Permission\Models\Permission;

class RoleSeeder extends Seeder
{
    /**
     * Run the database seeds.
     */
    public function run(): void
    {
        // Create super-admin role
        $superAdmin = Role::firstOrCreate(['name' => 'super-admin']);
        // super-admin gets all permissions inherently via Gate::before in AppServiceProvider,
        // but we can also assign them if we want. In this architecture, it is usually bypassed.
        // We will assign them just to be thorough as PRD says: "Assigned Permissions: All Permissions"
        $superAdmin->syncPermissions(Permission::all());

        // Create user role
        $user = Role::firstOrCreate(['name' => 'user']);
        $user->syncPermissions([
            'resume.view',
            'resume.create',
            'resume.delete',
            'job.create',
            'analysis.create',
            'analysis.view',
        ]);
    }
}
