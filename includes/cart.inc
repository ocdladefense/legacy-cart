<?php

/**
 * @Query
 * @Description - retrieve items from a user's cart
 *
 */
function cart_view_cart($title = null)
{

	$query = new DBQuery(
		$params = array(
			"type" => "select",
			"tablenames" => array(
				0 => array(
					"name"			=>	"cart",
					"op"				=>	"",
					"fields"		=>	array()
				)
			),
			"keys" => array(
				"Customer_ID" => $userobj->SessionID,
			),
		)
	);

	$result = $query->exec();
	$items = array();
	foreach($result as $arr)
	{
		$item = new stdClass();
		foreach($arr as $key=>$value)
		{
			$name = strtolower(trim($key));
			if(!empty($key))
			{
				$item->$name = $value;
			}
		}
		$items[] = $item;
	}
	$output = "<h1>{$title}</h1>";
	$output .= theme_cart( $items );
	return $output;
}
		



function cart_force_form_first_click_redirect(&$form_state)
{
	$form_state['cart_action'] = 'first_click';
	$_SESSION['cart'] = array('first_click'=>true);
	$form_state['messages'] = array(
		array(
		'classes' => array('msg','notice'),
		'msg' => array( 'Login to receive members-only discounts.' ),
		),
	);
	$form_state['redirect'] = array(
		'type'				=> 'external',
		'value'				=> 'login1.php',
		'server'			=> 'auth.ocdla.org',
		'protocol'		=> 'https://',
		'ref'					=> 'https://www.ocdla.org'.$form_state['values']['script_name'] .'?i='.$form_state['values']['parent_i'],
	);
}




function cart_force_authorization_redirect(&$form_state)
{
	$form_state['cart_action'] = 'requires_login';
	$_SESSION['cart'] = array('first_click'=>true);
	$form_state['messages'] = array(
		array(
		'classes' => array('msg','notice'),
		'msg' => array( 'You must be logged in to purchase these products.' ),
		),
	);
	$form_state['redirect'] = array(
		'type'				=> 'external',
		'value'				=> 'login1.php',
		'server'			=> 'auth.ocdla.org',
		'protocol'		=> 'https://',
		'ref'					=> 'https://www.ocdla.org'.$form_state['values']['script_name'] .'?i='.$form_state['values']['parent_i'],
	);
}




function getCartReferrer($scriptName,$parentProductId)
{
	return $scriptName .'?i='.$parentProductId;
}

function getRequestProducts()
{
	global $request;
	$ids = $request->getRequestValue('itemid');
	$qtys = $request->getRequestValue('quantity');
	if(empty($ids)) return false;
	$items = array();
	for($i=0; $i<count($ids); $i++ ){
		if($qtys[$i]>0){
			$items[$ids[$i]] = $qtys[$i];
		}
	}
	return $items;
}



function checkRequiresMembership($products)
{
	foreach( $products AS $product )
	{
		if($product->NonMemberPurchase == 'no') return true;
	}
	return false;
}


function checkIsMembershipProduct($products)
{
	foreach( $products AS $product )
	{
		if( $product->Category == 'Membership' ) return true;
	}
	return false;
}

function hasMembershipInCart($sessionid)
{
	$results = db_query('SELECT * FROM cart JOIN catalog ON(cart.ItemNumber=catalog.i) WHERE Customer_ID=:1',array($sessionid));
	while($product = $results->fetch_assoc())
	{
		if($product['Category'] == 'Membership') return true;
	}
	return false;
}