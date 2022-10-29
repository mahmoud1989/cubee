<?php
// Add custom Theme Functions here

add_action( 'wp_enqueue_scripts', 'webozza_assets' );
function webozza_assets() {
    wp_enqueue_script( 'custom-script', get_stylesheet_directory_uri() . '/js/custom6.js', array( 'jquery' ) );
}

/**
 * Change a currency symbol
 */
add_filter('woocommerce_currency_symbol', 'change_existing_currency_symbol', 10, 2);

function change_existing_currency_symbol( $currency_symbol, $currency ) {
     switch( $currency ) {
          case 'AED': $currency_symbol = 'AED'; break;
     }
     return $currency_symbol;
}

/**
 * Add or modify States
 */
add_filter( 'woocommerce_states', 'custom_woocommerce_states' );

function custom_woocommerce_states( $states ) {

  $states['AE'] = array(
    'AZ' => 'Abu Dhabi', 
	'DU' => 'Dubai', 
	'AJ' => 'Ajman', 
	'SH' => 'Sharjah', 
	'FU' => 'Fujairah', 
	'RK' => 'Ras Alkhemah', 
	'UQ' => 'Umm Al Quwain', 
    'AI' => 'Al Ain'
  );

  return $states;
}

function custom_product_description($atts){
    global $product;

    try {
        if( is_a($product, 'WC_Product') ) {
            return wc_format_content( $product->get_description("shortcode") );
        }

        return "Product description shortcode run outside of product context";
    } catch (Exception $e) {
        return "Product description shortcode encountered an exception";
    }
}
add_shortcode( 'custom_product_description', 'custom_product_description' );


// remove OOS products from related products in WooCommerce, because they are OOS! by Robin Scott of silicondales.com - see more at https://silicondales.com/tutorials/woocommerce/remove-out-of-stock-products-from-woocommerce-related-products/
add_filter( 'woocommerce_related_products', 'exclude_oos_related_products', 10, 3 );

function exclude_oos_related_products( $related_posts, $product_id, $args ){
    $out_of_stock_product_ids = (array) wc_get_products( array(
          'status'       => 'publish',
          'limit'        => -1,
          'stock_status' => 'outofstock',
          'return'       => 'ids',
      ) );

    $exclude_ids = $out_of_stock_product_ids;

    return array_diff( $related_posts, $exclude_ids );
}

add_filter('woocommerce_get_availability', 'custom_get_availability', 1, 2);
function custom_get_availability($availability, $product) {
  if ($availability['availability'] == '') {
    $availability['availability'] = __('In Stock', 'woocommerce');
  }
  return $availability;
}

// Rename My account > Orders "view" action button text
add_filter( 'woocommerce_my_account_my_orders_actions', 'change_my_account_my_orders_view_text_button', 10, 2 );
function change_my_account_my_orders_view_text_button( $actions, $order ) {
    $actions['view']['name'] = __( 'View Order', 'woocommerce' );

    return $actions;
}

// Display the product thumbnail in order view pages
add_filter( 'woocommerce_order_item_name', 'display_product_image_in_order_item', 20, 3 );
function display_product_image_in_order_item( $item_name, $item, $is_visible ) {
    // Targeting view order pages only
    if( is_wc_endpoint_url( 'view-order' ) ) {
        $product   = $item->get_product(); // Get the WC_Product object (from order item)
        $thumbnail = $product->get_image(array( 36, 36)); // Get the product thumbnail (from product object)
        if( $product->get_image_id() > 0 )
            $item_name = '<div class="item-thumbnail">' . $thumbnail . '</div>' . $item_name;
    }
    return $item_name;
}



/**
 * Change some text.
 *
 * @param String $text WordPress Text Stream.
 * @return String
 */
function acme_change_some_text( $text ) {
    if ( 'Lost your password?' === $text ) {
        $text = 'Forgot Password?';
    }

    // Important to return the text stream.
    return $text;
}

function custom_default_variation_price( $price, $product ) {
    foreach($product->get_available_variations() as $pav){
        $defautl=true;
        foreach($product->get_default_attributes() as $defkey=>$defval){
            if($pav['attributes']['attribute_'.$defkey]!=$defval){
                $defautl=false;             
            }   
        }
        if($defautl){
            $price = $pav['display_price'];         
        }
    }   
    return wc_price($price);
}
add_filter( 'woocommerce_variable_sale_price_html', 'custom_default_variation_price', 10, 2 );
add_filter( 'woocommerce_variable_price_html', 'custom_default_variation_price', 10, 2 );

add_filter('woocommerce_get_price_html', 'lw_hide_variation_price', 10, 2);

function lw_hide_variation_price( $v_price, $v_product ) {

$v_product_types = array( 'variable');

if ( in_array ( $v_product->product_type, $v_product_types ) && !(is_shop() || is_front_page()) ) {

return '';

}

return $v_price;
}

// Change Password Hint
add_filter( 'password_hint', function( $hint )
{
  return __( 'Hint: The password should be at least 8 characters long. Use upper and lower case letters, numbers, and symbols like ! " ? $ % ^ &amp; ).' );
} );


add_filter( 'woocommerce_min_password_strength', 'reduce_min_strength_password_requirement' );
function reduce_min_strength_password_requirement( $strength ) {
    // 3 => Strong (default) | 2 => Medium | 1 => Weak | 0 => Very Weak (anything).
    return 1; 
}


//add_action('woocommerce_process_registration_errors', 'validatePasswordReg', 10, 2 );

//function validatePasswordReg( $errors, $user ) {
    // change value here to set minimum required password chars
//    if(strlen($_POST['password']) > 8  ) {
//        $errors->add( 'woocommerce_password_error', __( 'Password must be 8 characters long. Use upper and lower case letters, numbers, and symbols like ! " ? $ % ^ &amp; ).' ) );
//    }
//    return $errors;
//    }
