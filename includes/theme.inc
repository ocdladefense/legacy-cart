<?php

function theme_cart( &$items = array() ) {	
		 $output = '<table cellspacing="0px" cellpadding="0px"><tr><th>&nbsp;</th><th>item</th><th>qty</th><th>price</th></tr>';		
		
		foreach( $items AS $item ) {
			$output .= "<tr><td>&nbsp;</td><td>{$item->itemnumber}</td><td>{$item->itemquantity}</td><td>{$item->totalitemprice}</td></tr>";
		}
		$output .= '</table>';
		return $output;
}



function theme_cart_item( $item ) {
	$output = "";
	$output .= '<tr><td>&nbsp;</td><td>$item->name</td><td>$item->qty</td><td>$item->total</td></tr>';
	return $output;
}