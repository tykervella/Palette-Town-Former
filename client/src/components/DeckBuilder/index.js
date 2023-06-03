import React from "react";
import SearchCards from "./components/SearchCards";
import DeckElement from "./components/DeckElement";
import CardElement from "./components/CardElement";
import Energy from "./components/Energy";

// The ...props means, spread all of the passed props onto this element
// That way we don't have to define them all individually
function DeckBuilder(props) {
  return (
    <div className="grid grid-cols-12 gap-4  ml-auto mr-auto flex-row mt-4 px-4">
      {/* Left side. Search Element */}
      <div className="col-span-8 border-2 border-red-700 min-h-screen">
        <SearchCards />
        <div className="grid grid-cols-12 mt-3 border-2 border-transparent">
            <CardElement image={"https://images.pokemontcg.io/mcd19/4.png"} cardName={"Alolan Sandshrew"}/>
            <CardElement image={"https://images.pokemontcg.io/hgss1/2.png"} cardName={"Azumarill"}/>
            <CardElement image={"https://images.pokemontcg.io/pop3/1.png"} cardName={"Blastoise"}/>
            <CardElement image={"https://images.pokemontcg.io/hgss4/5.png"} cardName={"Mamoswine"}/>
            <CardElement image={"https://images.pokemontcg.io/hgss1/4.png"} cardName={"Gyrados"}/>
            <CardElement image={"https://images.pokemontcg.io/ecard2/H4.png"} cardName={"Azumarill"}/>
        
            <CardElement image={"https://images.pokemontcg.io/base6/2.png"} cardName={"Articuno"}/>
            <CardElement image={"https://images.pokemontcg.io/ex4/3.png"} cardName={"Team Aqua's Kyogre"}/>
            <CardElement image={"https://images.pokemontcg.io/ex4/2.png"} cardName={"Team Aqua's Crawdaunt"}/>
        </div>
      </div>

      {/* Right Side. WIP Deck Element */}
      <div className="col-span-4 ml-4 border-2 border-red-700 min-h-screen">
        {/* Deck Name,  */}
        <div className="grid grid-cols-12 w-11/12 flex-row ml-2 mt-3 border-2 border-transparent">
          <input id="searchbar" className="col-span-9 rounded text-center border-2 border-red-700" placeholder="Deck Name"/>
          <h1 className="col-span-3 text-center">41/60</h1>
        </div>

        <div className="grid grid-cols-12  flex-row items-center justify-items-center justify-between ml-2 mt-1 ">
          <button className="btn text-xs col-span-4" id="savebtn">Save as Draft</button>
          <button className="btn text-xs col-span-4 ml-4" id="searchbtn">Publish Deck</button>
        </div>


        <div className="grid grid-cols-12 w-11/12 flex-row ml-2 mt-3 border-2 border-transparent">
          <h1 className="col-span-12 text-center"> Pokemon Cards (14) </h1>
          <DeckElement image={"https://images.pokemontcg.io/base6/95.png"} cardName={"Squirtle"}/>
          <DeckElement image={"https://images.pokemontcg.io/pgo/16.png"} cardName={"Wartortle"}/>
          <DeckElement image={"https://images.pokemontcg.io/pop3/1.png"} cardName={"Blastoise"}/>
          <DeckElement image={"https://images.pokemontcg.io/base6/2.png"} cardName={"Articuno"} />
          
        </div>

        <div className="grid grid-cols-12 w-11/12 flex-row ml-2 mt-3 border-2 border-transparent">
          <h1 className="col-span-12 text-center"> Trainer Cards (7) </h1>
          <DeckElement image={"https://images.pokemontcg.io/gym1/16.png"} cardName={"Erika"}/>
          <DeckElement image={"https://images.pokemontcg.io/dv1/18.png"} cardName={"Exp. Share"}/>
        </div>

        <div className="grid grid-cols-12 w-11/12 flex-row ml-2 mt-3 border-2 border-transparent">
          <h1 className="col-span-12 text-center"> Energy Cards (20) </h1>
          <Energy image={"https://images.pokemontcg.io/ex12/81.png"} cardName={"Rainbow Energy"}/>
          <Energy image={"https://images.pokemontcg.io/ecard1/165.png"} cardName={"Water Energy"}/>
        </div>


      
      </div>

    </div>

  );
}

export default DeckBuilder;
