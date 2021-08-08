<?php

namespace App;

use App\QuestionModel;
use Illuminate\Database\Eloquent\Model;

class AnswersModel extends Model
{
    protected $table = 'tbl_answers';

    public function question()
    {
        return $this->belongsTo(QuestionModel::class, "fk_question_id");
    }
}
