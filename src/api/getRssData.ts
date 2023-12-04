import { AxiosError } from 'axios';
import axiosInstance from './axiosInstance';
import {  XMLParser } from 'fast-xml-parser';

interface IGetRssData {
    rssList: string[],
    frequency: number
}

interface IRssData {
    rss: {
    channel: {
        item: {
            title: string;
            link: string;
            pubDate: string;
            category: string[];
            }[];
        }
    }
}

export interface IRssDataResponse {
    label: string;
    detail: string;
    link: string;
    pubDate: string;
}

export default async function getRssData( { rssList, frequency }: IGetRssData): Promise<IRssDataResponse[]> {
    const parser = new XMLParser();
    let response: IRssDataResponse[] = [];
    try {
        const results = await Promise.all(
            rssList.map(async (url) => {
                const rssData: IRssData =  parser.parse(await fetchUrl(url, frequency));
                return rssData.rss.channel.item.map(article => {
                  return {
                    label: article.title,
                    detail: article.category.join(",").replaceAll("-", " "),
                    link: article.link,
                    pubDate: article.pubDate
                  };
                });
            })
        );
        response = Array.prototype.concat.apply([], results) as IRssDataResponse[];
    }
    catch(error) {
        console.error(error);
    }
    finally {
        return response;
    }
}

const fetchUrl = async (url: string, fequencyData: number) => {
    try {
      const response = await axiosInstance.get(url, { cache: {ttl: fequencyData} });
      return response.data; // Return the response data or modify as needed
    } catch (error: AxiosError | any) {
      console.error(`Error fetching ${url}: ${error.message}`);
      throw error;
    }
  };