import { TwitterTimelineEmbed } from "react-twitter-embed";

const TwitterTimeline = () => {
    return (
        <div>
            <TwitterTimelineEmbed
                sourceType="profile"
                screenName="LTAtrafficnews"
                options={{ height: 600 }}
            />
        </div>
    );
}

export default TwitterTimeline;
