import {default as config} from "../config.json";
import { MEDIUM_FEED_BASE_URL } from "../constants";
/**
 * Retrieves the frequency data based on the current configuration.
 *
 * @return {number} The frequency data in milliseconds.
 */
export const getFreqeuncyData = () : number => {
    const frequency = config.fequency;
    switch (frequency) {
        case "half-hourly":
            return 1000 * 60 * 30;
        case "hourly":
            return 1000 * 60 * 60;
        case "daily":
            return 1000 * 60 * 60 * 24;
        case "weekly":
            return 1000 * 60 * 60 * 24 * 7;
        case "monthly":
            return 1000 * 60 * 60 * 24 * 30;
        default:
            return -1;
    }
};

/**
 * Retrieves a list of RSS data based on the configured RSS feed list.
 *
 * @return {string[]} An array of strings representing the RSS data.
 */
export const getRssListData = () : string[] => {
    const result: string[] = [];
    config.rssFeedList.forEach(item => {
        if (item.startsWith(MEDIUM_FEED_BASE_URL)) {
            result.push(item);
        }
    });
    return result;
};