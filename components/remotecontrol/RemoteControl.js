// components/remotecontrol/RemoteControl.js

/*
 * *** RemoteControl  ***
 * --------------------------
 * 
 */


const  ToolsBar = ({className}) => {
  return (
    <div  className={`${className} flex justify-between `}>
      <div>play</div>
      <div>autoplay</div>
      <div>gallery</div>
      <div>something</div>
    </div>
  );
}

const Title  = ({className}) => {
  return (
    <div className={`${className} `}>
      Schaudepot: Peter Reinhold | Kernbestand
    </div>
  );
}

export const RemoteControl = () => {
  return (
    <div className="inline-flex ">
      <div className="">*</div>
      <div className="ml-2 ">
        <Title className="px-2 py-2 border-b border-gray-800" />
        <ToolsBar className="px-2 py-2" />
      </div>
    </div>
  );
} 