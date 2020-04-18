<?php

$db_connection = new mysqli("localhost", "root", "", "react_api");
if ($db_connection->connect_errno) {
	die("Could not connect to the DB: " . $db_connection->connect_error);
}

$users_array = array();
$my_query = "SELECT * FROM users";
$test_query = "SELECT * FROM users";
if (!empty($_GET)) {
	$count = 0;
	foreach ($_GET as $key => $value) {
		if ($count == 0) {
			$test_query = $test_query . " WHERE {$key} LIKE '%{$value}%'";
		} else {
			$test_query = $test_query . " OR {$key} LIKE '%{$value}%'";
		}
		$count++;
	}
}

$result = $db_connection->query($test_query);
if ($result) {
	while($row = $result->fetch_array(MYSQLI_ASSOC)) {
		$users_array[] = $row;
	}
	$result->close();
}

echo json_encode($users_array);
$db_connection->close();
