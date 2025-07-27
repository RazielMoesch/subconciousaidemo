import { useState } from "react";
import "../Styles/Demo.css";

const Demo = () => {
    const [tab, setTab] = useState("gen_desc");
    const apiLink = "http://127.0.0.1:8000";
    const [initialDescription, setInitialDescription] = useState("");
    const [optimizedDesc, setOptimizedDesc] = useState("Optimized Description Will Appear Here.");
    const [chosenDesc, setChosenDesc] = useState("");
    const [segment, setSegment] = useState(null);
    const [obj, setObj] = useState(null)

    const [strengths, setStrengths] = useState(null);
    const [weaknesses, setWeaknesses] = useState(null);
    const [opportunities, setOpportunities] = useState(null);
    const [threats, setThreats] = useState(null);
    const [marketPositioning, setMarketPositioning] = useState(null);
    const [buyerPersona, setBuyerPersona] = useState(null);
    const [investmentOpportunities, setInvestmentOpportunities] = useState(null);
    const [channelsDistribution, setChannelsDistribution] = useState(null);
   

    const getBetterDesc = async (desc) => {

        if (initialDescription === ""){
            return;
        }

        const response = await fetch(`${apiLink}/better_description`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ written_description: desc }) 
        });
        const data = await response.json();
        setOptimizedDesc(data.better_description); 
    };



    const handleGenerateAnalysis = async () => {
        const response = await fetch(`${apiLink}/swot`, {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({
                generated_description: chosenDesc,
                segment: segment,
                objective: obj
            })
        });

        const swotData = await response.json();

        setStrengths(swotData["Strengths"]);
        setWeaknesses(swotData["Weaknesses"]);
        setOpportunities(swotData["Opportunities"]);
        setThreats(swotData["Threats"]);
        setMarketPositioning(swotData["Market Positioning"]);
        setBuyerPersona(swotData["Buyer Persona"]);
        setInvestmentOpportunities(swotData["Investment Opportunities"]);
        setChannelsDistribution(swotData["Channels & Distribution"]);
    };


    return (
        <div className="demo-page-container">
            <div className="demo-tabs-selector">
                <h1
                    className={`demo-tab-selection ${tab === "gen_desc" ? "selected" : ""}`}
                    onClick={() => setTab("gen_desc")}
                >
                    Description
                </h1>
                <h1
                    className={`demo-tab-selection ${tab === "select-params" ? "selected" : ""}`}
                    onClick={() => setTab("select-params")}
                >
                    Parameters
                </h1>
                <h1
                    className={`demo-tab-selection ${tab === "generate-result" ? "selected" : ""}`}
                    onClick={() => setTab("generate-result")}
                >
                    Result
                </h1>
            </div>

            {tab === "gen_desc" && (
                <div className="gen-desc-container">
                    <h1 className="demo-tab-title">Write a description of your product and its goal.</h1>
                    <textarea
                        className="demo-user-input"
                        value={initialDescription}
                        onChange={(e) => setInitialDescription(e.target.value)}
                        placeholder="Type your description..."
                        rows={5}
                    />

                    <h1 className="demo-tab-title">Generate an optimized version of your description.</h1>

                    <div className="demo-desc-button-container">
                        <button onClick={() => getBetterDesc(initialDescription)}>Generate</button>
                        <button onClick={() => setOptimizedDesc(initialDescription)}>Use Original</button>
                    </div>

                    <h1 className="demo-tab-title">Optimized Description</h1>
                    <textarea
                        className="demo-user-input"
                        value={optimizedDesc}
                        onChange={(e) => setOptimizedDesc(e.target.value)}
                        placeholder="Optimized description will appear here."
                        rows={5}
                    />
                    <button onClick={() => setTab("select-params")}>Continue</button>
                </div>
            )}

            {tab === "select-params" && (
                <div className="select-params-container">
                    <h1>Chosen Description</h1>
                    <p>{optimizedDesc}</p>
                    <h1 className="demo-tab-title">Fill in the parameters of your study.</h1>
                    <h2>Select a Segment</h2>
                    <div className="segment-options">

                        <h2 className={segment==="gen-z" ? "selected" : "segment-option"} onClick={() => setSegment("gen-z")}>Gen Z Creators</h2>
                        <h2 className={segment==="uca" ? "selected" : "segment-option"} onClick={() => setSegment("uca")}>Urban Climate Advocates</h2>
                        <h2 className={segment==="smb" ? "selected" : "segment-option"} onClick={() => setSegment("smb")}>Cost-Sensitive SMB Owners</h2>
                        <h2 className={segment==="diy" ? "selected" : "segment-option"} onClick={() => setSegment("diy")}>Retired DIYers</h2>
                        <h2 className={segment==="it" ? "selected" : "segment-option"} onClick={() => setSegment("it")}>Enterprise IT Leaders</h2>

                    </div>

                    <h2>Select Your Main Business Objective</h2>
                    <div className="segment-options">

                        <h2 className={obj==="ia" ? "selected" : "segment-option"} onClick={() => setObj("ia")}>Increase Awareness</h2>
                        <h2 className={obj==="ic" ? "selected" : "segment-option"} onClick={() => setObj("ic")}>Increase Consideration</h2>
                        <h2 className={obj==="is" ? "selected" : "segment-option"} onClick={() => setObj("is")}>Increase Sales</h2>
                        

                    </div>

                </div>
            )}

            
            {tab === "generate-result" && (

                    <div className="result-container">
                        <button onClick={() => handleGenerateAnalysis()}>Generate Analysis</button>

                        <div className="swot-cards-wrapper">
                            <div className="swot-card">
                                <h3>Strengths</h3>
                                {strengths?.split(/\d+\.\s*/).filter(Boolean).map((item, index) => (
                                    <p key={index}>{index + 1}. {item.trim()}</p>
                                ))}
                            </div>

                            <div className="swot-card">
                                <h3>Weaknesses</h3>
                                {weaknesses?.split(/\d+\.\s*/).filter(Boolean).map((item, index) => (
                                    <p key={index}>{index + 1}. {item.trim()}</p>
                                ))}
                            </div>

                            <div className="swot-card">
                                <h3>Opportunities</h3>
                                {opportunities?.split(/\d+\.\s*/).filter(Boolean).map((item, index) => (
                                    <p key={index}>{index + 1}. {item.trim()}</p>
                                ))}
                            </div>

                            <div className="swot-card">
                                <h3>Threats</h3>
                                {threats?.split(/\d+\.\s*/).filter(Boolean).map((item, index) => (
                                    <p key={index}>{index + 1}. {item.trim()}</p>
                                ))}
                            </div>

                            <div className="swot-card">
                                <h3>Market Positioning</h3>
                                <p>{marketPositioning}</p>
                            </div>

                            <div className="swot-card">
                                <h3>Buyer Persona</h3>
                                <p>{buyerPersona}</p>
                            </div>

                            <div className="swot-card">
                                <h3>Investment Opportunities</h3>
                                <p>{investmentOpportunities}</p>
                            </div>

                            <div className="swot-card">
                                <h3>Channels & Distribution</h3>
                                <p>{channelsDistribution}</p>
                            </div>
                        </div>
                    </div>
                )}


        </div>
    );
};

export default Demo;
