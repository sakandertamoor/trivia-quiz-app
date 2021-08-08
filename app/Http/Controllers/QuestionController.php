<?php

namespace App\Http\Controllers;

use App\AnswersModel;
use App\QuestionModel;
use Illuminate\Http\Request;

class QuestionController extends Controller
{
    public function allQuestions(Request $request) {
        return QuestionModel::with("answers")->get();
    }
    public function addQuestion(Request $request){
       $question = QuestionModel::create([
           "question"=>$request->input("question")
       ]);
       $answers = [];
       foreach ($request->input("answers") as $key => $value) {
           $answers[] = [
            "fk_question_id"=> $question->id,
            "answer"=>$value,
            "created_at" => date("Y-m-d H:i:s"),
            "updated_at" => date("Y-m-d H:i:s"),
           ];
       }
       AnswersModel::insert($answers);
       return [
           "status" => true,
           "data" => $question,
           "message" => "Question added successfully"
       ];
    }
    public function updateQuestion(Request $request, QuestionModel $question){
       $updateStatus = $question->update($request->all());
       return [
           "status" => true,
           "data" => $updateStatus,
           "message" => "Question updated successfully"
       ];
    }
    public function bulkDeleteQuiz(Request $request){
    QuestionModel::whereIn("id", $request->input("ids"))->delete();
        AnswersModel::whereIn("fk_question_id", $request->input("ids"))->delete();
        return [
            "status"=>true,
            "message"=> "Records Deleted Successfully"
        ];
    }
}
