/**
 * @file
 */

// This code was mostly supplied to us by Karde, our changes will be commented below.
( function( $ ) {
  $.fn.flipcard = function( params ) {
    const Memory = {
      $game: null,
      hintCount: 0, // Tracks failed player guesses, used for hints
      guesses: 0,   // Tracks player guesses, used for stats
      startTime: 0, // Starts on first card clicked, used for stats
      stopTime: 0,  // When final pair is found, used for stats
      hintStat: 0,  // Amount of hints given, used for stats
      init( el, options ) {
        const shuffledCards = this.shuffle( options.cards );
        const slicedCards = shuffledCards.slice( 0, options.limit );

        this.blockid = options.id;
        this.facedown = options.facedown;
        this.cardsArray = $.merge( slicedCards, slicedCards );
        this.shuffleCards( );
        this.setup( el );
        this.binding( el );
      },

      shuffleCards( ) {
        this.$cards = $( this.shuffle( this.cardsArray ) );
      },

      setup( el ) {
        el.html( this.buildHTML() );
        var stats = document.getElementById("stats");
        stats.style.display = "none"; // Hide stats on game start
      },

      binding( el ) {
        el.on( "click", ".card", this.cardClicked );
        $(document).on( "click", ".reset", this.reset );
      },

      getData( el, key ) {
        return el.closest( ".flipcard" ).data( key );
      },

      setData( el, key, value ) {
        el.closest( ".flipcard" ).data( key, value );
      },

      cardClicked() {
        const _ = Memory;
        const $card = $( this );
        
        if (!_.getData( $card, "paused" ) &&
            !$card.find( ".inside" ).hasClass( "matched" ) &&
            !$card.find( ".inside" ).hasClass( "picked" )
        )
        
        {
          $card.find( ".inside" ).addClass( "picked" );
              
          // if its clicked the first time, start guessing.
          if (!_.getData( $card, "guess" )) {
            _.setData( $card, "guess", $( this ).attr( "data-id" ) );
            _.guesses++;
            if (_.startTime == 0) {
              _.startTime = Date.now();
            }

            // If enough failed attempts, give hint
            if (_.hintCount >= hintLimit) {
              // This saves the matching card of the currently picked one, for further use
              $hintCard = $(this).siblings().filter(function(i) {
                return $(this).attr("data-id") === _.getData( $card, "guess"); //Scan through all cards until true match is found
              });

              _.hintStat++;
              $hintCard.addClass("hint");
            }
          } 
          
          // If we are guessing and right card is clicked, set a match and start guessing next.
          else if ( _.getData( $card, "guess" ) === $( this ).attr( "data-id" ) && !$( this ).hasClass( "picked" ) ) {
            $card.closest( ".flipcard" ).find( ".picked" ).addClass( "matched" );
            _.setData( $card, "guess", null );
            _.hintCount = 0; // Resets failed attempt count
            $(".hint").removeClass("hint"); // Removes hint class
          } 
          
          // It's not a correct guess, reset both the cards and start guessing again.
          else {
            _.hintCount++;
            _.setData( $card, "guess", null );
            _.setData( $card, "paused", true );
            $(".hint").removeClass("hint");
            setTimeout( () => {
              $card.closest( ".flipcard" ).find( ".picked" ).removeClass( "picked" );
              _.setData( $card, "paused", false );
            }, 600);
          }
          
          // Flag success image when all cards are identified.
          if (
            $card
            .closest( ".flipcard" )
            .find( ".matched" )
            .length === $card
            .closest( ".flipcard" )
            .find( ".card" )
            .length ) {
              _.win( _, $card );
            }
        }
      },
      
      win(_, $card ) {
        const overlay = $card.closest( ".flipcard" ).find( ".modal-overlay" );
        const modal = $card.closest( ".flipcard" ).find( ".modal" );
        const blockId = $card.closest( ".flipcard" ).data( "options" ).id;
        
        $card.closest( ".flipcard" ).find( ".card" ).hide();
        overlay.show();
        _.stopTime = (Date.now() - _.startTime)/1000; // Saves final time as seconds
        _.setData( $card, "paused", true );
       
        // Initialize user stats
        if (localStorage.getItem('game_stats') === null) {
          localStorage.setItem('game_stats', '');  
        }
        
        // Build stats into save string format and save
        let game_stats = localStorage.getItem('game_stats') + user_id + "|" + _.stopTime + "|" + _.guesses + "|" + _.hintStat + "|" + cardAmount + ";";
        localStorage.setItem('game_stats', game_stats);

        // Make stats visible, reset stat counters
        drawStats();
        var stats = document.getElementById("stats");
        stats.style.display = "block";
        _.guesses = 0;
        _.startTime = 0;

        // Make win buttons clickable after some time
        setTimeout( () => {
        $( `[data-game="#${blockId}"]` ).prop( "disabled", false ).removeClass("btn-disabled");
        $( `._${blockId}_button` ).prop( "disabled", false ).removeClass( "btn-disabled" );
        }, 1000 );
      },

      reset() {
        const _ = Memory;
        const el = $($( this ).data( "game" ));
        if ( el.length ) {
          el.data( "paused", false )
            .data( "guess", null );
          _.init( el, el.data( "options" ) );
          $(this).prop('disabled',true).addClass("btn-disabled");
        }
      },

      // Fisher--Yates Algorithm -- https://bost.ocks.org/mike/shuffle/
      shuffle( array ) {
        let counter = array.length; let temp; let index;
        while ( counter > 0 ) {
          index = Math.floor( Math.random() * counter );
          counter--;
          temp = array[ counter ];
          array[ counter ] = array[ index ];
          array[ index ] = temp;
        }
        return array;
      },

      buildHTML() {
        let frag = "";
        const { facedown } = this;
        
        this.$cards.each( ( k, v ) => { // eslint-disable-line no-unused-vars
          frag += `<div class="card" data-id="${v.id}"><div class="inside">
          <div class="front" title="${v.alt}" style="background-image: url(${v.url})"></div>
          <div class="back" title="${facedown.alt}" style="background-image: url(${facedown.url})"></div>
          </div></div>`;
        } );

        let overlay = "<div class=\"modal-overlay\">";
        overlay += "<div class=\"modal hidden\">";
        overlay += '<button class="reset">Play Again?</button>';
        overlay += "</div>";
        frag += overlay;
        return frag;
      }
    };
    
    // Sets up the board layout
    // The reason for 2x2, 3x2, 4x4 here and 
    // twobytwo, threebytwo and fourbyfour in
    // .twig is because of CSS rules
    switch (cardAmount) {
      case "2x2":
        t = 2;
        break;
    
      case "3x2":
        t = 3;
        break;

      case "4x4":
        t = 8;
        break;

      default:
        t = 3
        break;
    }

    params = $.extend( {
      success: null,
      limit: t, // Sets amount of cards = (t*2)
      cards: []
    }, params );

    this.each(function() {
      const memory = Object.create( Memory );
      $( this ).addClass( "flipcard" )
        .data( "paused", false )
        .data( "guess", null )
        .data( "options", params);
      memory.init( $( this ), params );
    } );

    return this;
  };
} )( jQuery );