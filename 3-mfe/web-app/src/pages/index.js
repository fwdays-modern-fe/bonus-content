import React,  {useEffect} from "react";

export default function Home() {

  useEffect(()=>{
    (async ()=>{
      if(typeof window !== "undefined"){
        const mount = import("list/ListIndex").then(module=>{
          console.log('module', module);
          module?.mount(document.querySelector('#list-root'));
        })
      }
    })()
  },[])
  return (
    <div>
      <h1>Host MFE</h1>
    </div>
  );
}
