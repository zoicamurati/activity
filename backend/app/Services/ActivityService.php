<?php
namespace App\Services;

use Illuminate\Http\Request;

/**
 * This class will be used for operations
 * performed on activity model
 */
class ActivityService
{
    /**
     * @param Request $request
     * @return mixed
     */
    public function index(Request $request)
    {
        return $this->getCourses($request, ['residences', 'offices', 'tax_regime', 'courses'], $type);
    }
}