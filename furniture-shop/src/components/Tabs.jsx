import TabNavItem from "../components/TabNavItem";
import TabContent from "../components/TabContent";
import LatestProducts from "./LatestProducts.jsx";
import {useState} from "react";
import tabsNames from "../data/data"


const Tabs = () => {
    const [activeTab, setActiveTab] = useState("tab1");

    return (
        <section className="tabsSection pb-[100px]">
            <h1 className="sectionHeadingText text-center">Latest Products</h1>
            <div className="Tabs centerContainer">

                <ul className="nav">
                    <TabNavItem title="New Arrival" id="tab1" activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <TabNavItem title="Best Seller" id="tab2" activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <TabNavItem title="Featured" id="tab3" activeTab={activeTab} setActiveTab={setActiveTab}/>
                    <TabNavItem title="Special Offer" id="tab4" activeTab={activeTab} setActiveTab={setActiveTab}/>
                </ul>

                <div className="outlet">
                    <TabContent id="tab1" activeTab={activeTab}>
                        <LatestProducts mark={tabsNames[0].nickname}/>
                    </TabContent>
                    <TabContent id="tab2" activeTab={activeTab}>
                        <LatestProducts mark={tabsNames[1].nickname}/>
                    </TabContent>
                    <TabContent id="tab3" activeTab={activeTab}>
                        <LatestProducts mark={tabsNames[2].nickname}/>
                    </TabContent>
                    <TabContent id="tab4" activeTab={activeTab}>
                        <LatestProducts mark={tabsNames[3].nickname}/>
                    </TabContent>
                </div>
            </div>
        </section>

    );
};

export default Tabs;