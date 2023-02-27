/* A javascript-enhanced crossword puzzle */
/* eslint-disable no-unused-vars, no-unused-vars, prefer-destructuring, no-undef */

( function( $, Drupal, drupalSettings ) {
  Drupal.behaviors.concentration_game = {
    attach( context, settings ) {
      const datas = drupalSettings.gameBoxes.concentration;
      $.each(datas, function( index, data ) {
        const uniqueid = data.uniqueID;
        $( ".concentrate .game" ).each(function() {
          $( `#${uniqueid}` ).flipcard( {
            cards: data.cards,
            facedown: data.facedown,
            id: uniqueid
          } );
        } );
      } );
    }
  };
} )( jQuery, Drupal, drupalSettings );
