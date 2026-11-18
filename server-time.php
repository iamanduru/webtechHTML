<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>ABC University - Server Time</title>
    <link rel="stylesheet" href="style.css">
    
</head>

<body>

    <header>
        <h1>ABC University</h1>

        <nav>
             <a href="index.html">Home</a>
            <a href="about.html">About</a>
            <a href="contact.html">Contact</a>
            <a href="server-time.php">Server Time</a>
            <a href="login.html">Login</a>
            <a href="register.html">Register</a>
        </nav>
    </header>

    <main>

        <section>
            <h2>Current Server Date and Time</h2>

            <?php
                date_default_timezone_set("Africa/Kigali");

                echo "<p>Current Date: " . date("l, d F Y") . "</p>";
                echo "<p>Current Time: " . date("h:i:s A") . "</p>";
            ?>

        </section>

    </main>

    <footer>
        <p>&copy; 2026 ABC University. All Rights Reserved.</p>
    </footer>

</body>
</html>