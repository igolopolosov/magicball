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

$app->post('/question', function () use ($app) {
    global $db;
    $data = json_decode($app->request->getBody());

    $answersData = $db->select("Answer", "Id,Text,TypeId", array());
    $answers = $answersData["data"];
    $answer = $answers[rand(0, count($answers) - 1)];

    $usersData = $db->select("User", "Id", array('Name' => $data->user));
    $user = $usersData["data"][0];

    $onInsert = new stdClass();
    $onInsert->Text = $data->question;
    $onInsert->DateTime = $data->date;
    $onInsert->AnswerId = $answer["Id"];
    $onInsert->StatusId = 1;
    $onInsert->UserId = $user["Id"];

    $rows = $db->insert("Question", $onInsert, array());
    if ($rows["status"] == "success") {
        $response = $answer["Text"];
        echoResponse(200, $response);
    } else {
        $response = "Internal server error.";
        echoResponse(500, $response);
    }

});

// Products
$app->get('/products', function () {
    global $db;
    $rows = $db->select("products", "id,sku,name,description,price,mrp,stock,image,packing,status", array());
    echoResponse(200, $rows);
});

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