<?php

namespace App;

use App\AnswersModel;
use Illuminate\Database\Eloquent\Model;

class QuestionModel extends Model
{
    protected $table = 'tbl_questions';

    /**
     * The attributes that are mass assignable.
     *
     * @var array
     */
    protected $fillable = [
        'question'
    ];
    public function answers()
    {
        return $this->hasMany(AnswersModel::class, "fk_question_id");
    }
}
