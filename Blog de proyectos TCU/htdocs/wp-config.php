<?php

/**
 * The base configuration for WordPress
 *
 * The wp-config.php creation script uses this file during the installation.
 * You don't have to use the web site, you can copy this file to "wp-config.php"
 * and fill in the values.
 *
 * This file contains the following configurations:
 *
 * * Database settings
 * * Secret keys
 * * Database table prefix
 * * ABSPATH
 *
 * @link https://wordpress.org/support/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'hoseo_31683094_ucrdatabase' );

/** Database username */
define( 'DB_USER', 'hoseo_31683094' );

/** Database password */
define( 'DB_PASSWORD', 'Molly_8864' );

/** Database hostname */
define( 'DB_HOST', 'sql304.hostinggratis.cyou' );

/** Database charset to use in creating database tables. */
define( 'DB_CHARSET', 'utf8mb4' );

/** The database collate type. Don't change this if in doubt. */
define( 'DB_COLLATE', '' );

/**#@+
 * Authentication unique keys and salts.
 *
 * Change these to different unique phrases! You can generate these using
 * the {@link https://api.wordpress.org/secret-key/1.1/salt/ WordPress.org secret-key service}.
 *
 * You can change these at any point in time to invalidate all existing cookies.
 * This will force all users to have to log in again.
 *
 * @since 2.6.0
 */
define( 'AUTH_KEY',         ',*K6}btMm*~LUcZ0&6@{4Yy!^ci;2+2=z<{k^,fbXlMD9ljw!=%BP++t#[%GL}j ' );
define( 'SECURE_AUTH_KEY',  '>HV)}MUfw(k9EHt*|Wmb#OF6/sNymxV-&SGJ0w=ml6Y2?R,E?7LJ@&BXX-#p[r5#' );
define( 'LOGGED_IN_KEY',    'y!;b2LWe1$x[CK%+=xp=_oPB9pF2Us4I2N58doqs>cSXL{9@v9-yiqBsr.:E+~X;' );
define( 'NONCE_KEY',        'h}zA?&zm/Ii 5Yvmn`1V#=IKdHu2qp8}H-]!ZzhwgV^2W!JHeiBnc4HWn4N!s:}I' );
define( 'AUTH_SALT',        'zYl/-C1-7ACRA^PzvgiT:R#/YiKfH8C}fHe2k=fmBql!8fk7=XpnOWMPZxt20x.1' );
define( 'SECURE_AUTH_SALT', '^o`(X88B5jk>7(7|ylkJ,#G S0iJiRT{vG`cpjdzbp1m~ZYAH<3$c#Z[G&zIYCV&' );
define( 'LOGGED_IN_SALT',   'Fl/N`hCF+82Nn=2>#{M(Wz0BB<aY+YYBaUUN`!g{H]5TbRm*=7[z}m%fyeF 2&zH' );
define( 'NONCE_SALT',       '^9y4pz8mM9M}gR-5KT`j8G&M88qII}5{&PjT@1/T7Ng0[93J>5lBl[*Ug}ee;&>S' );

/**#@-*/

/**
 * WordPress database table prefix.
 *
 * You can have multiple installations in one database if you give each
 * a unique prefix. Only numbers, letters, and underscores please!
 */
$table_prefix = 'wp_';

/**
 * For developers: WordPress debugging mode.
 *
 * Change this to true to enable the display of notices during development.
 * It is strongly recommended that plugin and theme developers use WP_DEBUG
 * in their development environments.
 *
 * For information on other constants that can be used for debugging,
 * visit the documentation.
 *
 * @link https://wordpress.org/support/article/debugging-in-wordpress/
 */
define( 'WP_DEBUG', false );

/* Add any custom values between this line and the "stop editing" line. */



/* That's all, stop editing! Happy publishing. */

/** Absolute path to the WordPress directory. */
if ( ! defined( 'ABSPATH' ) ) {
	define( 'ABSPATH', __DIR__ . '/' );
}

/** Sets up WordPress vars and included files. */
require_once ABSPATH . 'wp-settings.php';
