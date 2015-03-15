<?php
require './libs/Slim/Slim.php';
require_once 'dbHelper.php';

\Slim\Slim::registerAutoloader();
$app = new \Slim\Slim();
$app = \Slim\Slim::getInstance();
$db = new dbHelper();

/**
 * Database Helper Function templates
 */
/*
select(table name, where clause as associative array)
insert(table name, data as associative array, mandatory column names as array)
update(table name, column names as associative array, where clause as associative array, required columns as array)
delete(table name, where clause as array)
*/

// Magicball
$app->post('/login', function () use ($app) {
    global $db;
    $data = json_decode($app->request->getBody());
    $response = new stdClass();
    $usersData = $db->select("User", "Id,Name,Password,Token", array('Name' => $data->user, 'Password' => $data->password));
    if ($usersData["status"] == 'success') {
        $token = md5(uniqid(mt_rand(), true));
        $user = $usersData["data"][0];

        $condition = array('Id' => $user["Id"]);
        $mandatory = array();
        $onUpdate = new stdClass();
        $onUpdate->Token = $token;
        $updatedUser = $db->update("User", $onUpdate, $condition, $mandatory);

        if ($updatedUser["status"] == 'success') {
            $response->user = $user["Name"];
            $response->status = $usersData["status"];
            $response->token = $token;
        }
    } else {
        $response->status = $usersData["status"];
        $response->message = 'Неправильное имя пользователя или пароль!';
    }
    echoResponse(200, $response);
});

$app->post('/add-question', function () use ($app) {
    global $db;
    $data = json_decode($app->request->getBody());

    $answersData = $db->select("Answer", "Id,Text,TypeId", array());
    $answers = $answersData["data"];
    $answer = $answers[rand(0, count($answers) - 1)];

    $usersData = $db->select("User", "Id", array('Name' => $data->user));
    $user = $usersData["data"][0];

    if ($user == null) {
        echoResponse(200, $answer["Text"]);
    } else {
        $onInsert = new stdClass();
        $onInsert->Text = $data->question;
        $onInsert->DateTime = $data->date;
        $onInsert->AnswerId = $answer["Id"];
        $onInsert->StatusId = 1;
        $onInsert->UserId = $user["Id"];
        $rows = $db->insert("Question", $onInsert, array());
        if ($rows["status"] == "success") {
            echoResponse(200, $answer["Text"]);
        }
    }
});

$app->post('/get-questions', function () use ($app) {
    global $db;
    $data = json_decode($app->request->getBody());
    $usersData = $db->select("User", "Id", array('Name' => $data->user));
    $user = $usersData["data"][0];

    $questionsData = $db->select("Question", "Id,Text,DateTime,AnswerId", array('UserId' => $user["Id"]));
    $questions = $questionsData["data"];

    foreach ($questions as &$q) {
        $answersData = $db->select("Answer", "Text, TypeId", array('Id' => $q["AnswerId"]));
        $answerText = $answersData["data"][0]["Text"];

        $answerTypeId = $answersData["data"][0]["TypeId"];
        $answerTypeData = $db->select("AnswerType", "Type", array('Id' => $answerTypeId));
        $answerType = $answerTypeData["data"][0]["Type"];
        unset($q["AnswerId"]);
        $q["Answer"] = $answerText;
        $q["AnswerType"] = $answerType;
    }

    $response = new stdClass();
    $response->questions = $questions;
    $response->status = $questionsData["status"];
    echoResponse(200, $response);
});

$app->post('/authentication', function () use ($app) {
    global $db;
    $data = json_decode($app->request->getBody());
    $usersData = $db->select("User", "Id,Name,Password", array('Token' => $data->token));
    $user = $usersData["data"][0];

    $response = new stdClass();
    $response->status = $usersData["status"];

    if ($usersData["status"] == "success") {
        $response->user = $user["Name"];
        $response->password = $user["Password"];
    }
    echoResponse(200, $response);

});

// Products
$app->post('/products', function () use ($app) {
    $data = json_decode($app->request->getBody());
    $mandatory = array('name');
    global $db;
    $rows = $db->insert("products", $data, $mandatory);
    if ($rows["status"] == "success")
        $rows["message"] = "Product added successfully.";
    echoResponse(200, $rows);
});

$app->put('/products/:id', function ($id) use ($app) {
    $data = json_decode($app->request->getBody());
    $condition = array('id' => $id);
    $mandatory = array();
    global $db;
    $rows = $db->update("products", $data, $condition, $mandatory);
    if ($rows["status"] == "success")
        $rows["message"] = "Product information updated successfully.";
    echoResponse(200, $rows);
});

$app->delete('/products/:id', function ($id) {
    global $db;
    $rows = $db->delete("products", array('id' => $id));
    if ($rows["status"] == "success")
        $rows["message"] = "Product removed successfully.";
    echoResponse(200, $rows);
});

function echoResponse($status_code, $response)
{
    global $app;
    $app->status($status_code);
    $app->contentType('application/json');
    echo json_encode($response, JSON_NUMERIC_CHECK);
}

$app->run();
?>