import Author from "../models/author";

const authorsList = [
    new Author(
      0,
      "S.Alireza",
      "Mousavizade",
      "CS & Economics Student",
      `
          Market data include any trading activity that occurs on an exchange or trading venue. Ideally, your data source has provided you with a raw feed including a variety of unstructured data, such as FIX messages that allow you to fully rebuild the trading book or the whole collection of BWIC (bids requested in competition) answers. Every market player leaves a distinct imprint in the trade records, and with enough perseverance, you will be able to predict a competitor's future action. TWAP algorithms, for example, create a distinct imprint that predatory algorithms utilize to advance their end-of-day trading (typically hedging) activities (Easley, López de Prado, and O'Hara [2011]). Human GUI traders frequently trade in round lots, which may be used to determine what percentage of the volume is originating from them at any given period in time and then connect it with a certain market behavior.
          `
    ),
    new Author(
      1,
      "Danial",
      "Nowroozi",
      "Math & Economics Student",
      `
          requested in competition) answers. Every market player leaves a distinct imprint in the trade records, and with enough perseverance, you will be able to predict a competitor's future action. TWAP algorithms, for example, create a distinct imprint that predatory algorithms utilize to advance their end-of-day trading (typically hedging) activities (Easley, López de Prado, and O'Hara [2011]). Human GUI traders frequently trade in round lots, which may be used to determine what percentage of the volume is originating from them at any given period in time and then connect it with a certain market behavior. One interesting feature of FIX data is that, unlike basic data, it is not straightforward to handle. It is also incredibly plentiful, with over $10 mathrmTB$ created per day. As a result, it becomes a more attractive dataset for strategy study.
          `
    ),
  ];
  
  
export function fetchAuthors() {
    return authorsList.map((author) => JSON.parse(JSON.stringify(author)))
}