<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class UserUpdateRequest extends FormRequest
{

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array
     */
    public function rules()
    {
        return [
            'first_name' => ['required', 'max:50'],
            'last_name' => ['required', 'max:50'],
            'email' => ['required', 'max:50', 'email',
            Rule::unique('users')->ignore($this->route('user')->id)],
            'spaces' => ['nullable', 'array',"min:0"],
            'spaces.*.id'=>['required','integer'],
            'spaces.*.name'=>['string'],
            'spaces.*.color'=>['string'],
            'spaces.*.read'=>['boolean'],
            'spaces.*.write'=>['boolean'],
            
        ];
    }
}
