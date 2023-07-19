<?php
require_once('plugins/login-servers.php');

// récupérer les valeurs des variables d'environnement
$db_host = getenv('DB_HOST');
$db_host_e2e = getenv('DB_HOST_E2E');
$db_username = getenv('DB_USERNAME');
$db_password = getenv('DB_PASSWORD');
$db_database = getenv('DB_DATABASE');

// définir les serveurs supportés
$servers = array(
    "DB Dev" => array(
        "server" => $db_host,
        "driver" => "pgsql",
        "username" => $db_username,
        "password" => $db_password,
        "db" => $db_database
    ),
    "DB test" => array(
        "server" => $db_host_e2e,
        "driver" => "pgsql",
        "username" => $db_username,
        "password" => $db_password,
        "db" => $db_database
    )
);

/** Set supported servers
    * @param array array($domain) or array($domain => $description) or array($category => array())
    * @param string
    */
return new AdminerLoginServers($servers, 'server');