<?php

namespace App\Enums;

enum JobSource: string
{
    case LINKEDIN = 'linkedin';
    case JOBSTREET = 'jobstreet';
    case INDEED = 'indeed';
    case CAREER_PAGE = 'career_page';
    case OTHER = 'other';
}
