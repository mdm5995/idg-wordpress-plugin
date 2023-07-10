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
 * @link https://wordpress.org/documentation/article/editing-wp-config-php/
 *
 * @package WordPress
 */

// ** Database settings - You can get this info from your web host ** //
/** The name of the database for WordPress */
define( 'DB_NAME', 'wp' );

/** Database username */
define( 'DB_USER', 'wp' );

/** Database password */
define( 'DB_PASSWORD', 'secret' );

/** Database hostname */
define( 'DB_HOST', 'mysql' );

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
define( 'AUTH_KEY',         ',^_?9Z&,lHM4>W7%Hrdhye5h=m8b>>r+E4//5{:ox~D@ 0.o3L}LGl$t~zB=zky ' );
define( 'SECURE_AUTH_KEY',  '40+p5j(#P=vGvuWZ9X9<W!paSFYER)W`8#(!{{k wknR$|mZ}$>ia8AXe88UpV=C' );
define( 'LOGGED_IN_KEY',    'ed3XZ.g|hDH6 P|A0f~L~81]79*eCa]Nm5DO%.j{$*vXZ^ ]2<]!n1+P|P,s&i#(' );
define( 'NONCE_KEY',        'n|zFypK6F9tQmfUN[UpUZ,eX{E6YfJNVh(M`~.civZc%hA&(bpY]UuCx>*Ok}wy*' );
define( 'AUTH_SALT',        ' t;A`zkWA)> C!`v&EM9xs3Kvhf;,%G<P&j4E%.WS+;8AK,.R79~?Ul#5n4cl6?Y' );
define( 'SECURE_AUTH_SALT', 'sD-yt:(1e}?hYKlnV.1@+~Jslz$B2(&d8+h`#Ru5ZSM)B3:DT-X3]DUn8U>Gc#C:' );
define( 'LOGGED_IN_SALT',   '0B=dYBBhN2R,Sh+McgeT4U%/CiD1DO3Wu/3}q>Vz2Ov=RiL5m![dJ$>rEuq*$E@f' );
define( 'NONCE_SALT',       '9jO{n lbK 7A]c39{7cc1kBzy2gEBQ(kV-<SD`1HKj8X-2PaA9igX/ [Zd$R@C$4' );

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
 * @link https://wordpress.org/documentation/article/debugging-in-wordpress/
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
