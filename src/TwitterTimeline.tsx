import { TwitterTimelineEmbed } from "react-twitter-embed";

const TwitterTimeline = () => {
    return (
        <div className="w-1/4">
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="LTAtrafficnews"
                options={{ height: 400 }}
            />
        </div>
    );
}

export default TwitterTimeline;
