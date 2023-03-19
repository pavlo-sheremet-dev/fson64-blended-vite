import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";
import toast from "react-hot-toast";
import { SearchForm } from "../components/SearchForm";
import { Section } from "../components/Section";
import { CocktailsList } from "../components/CocktailsList";
import { Loader } from "../components/Loader";

import { searchByName } from "../api/cocktail-service";

export const Cocktails = () => {
  const [cocktails, setCocktails] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [searchParams] = useSearchParams();

  const query = searchParams.get("query");

  useEffect(() => {
    if (!query) return;
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setError("");
        const cocktails = await searchByName(query);

        if (!cocktails.length) {
          toast("Not found");
        }

        setCocktails(cocktails);
        // setError('')
      } catch (error) {
        setError(error.message);
      } finally {
        setIsLoading(false);
      }
    };
    asyncWrapper();

    // (async () => {
    //   console.log("update");
    // })();
  }, [query]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  return (
    <>
      <Section>
        <h1 className="uppercase text-4xl text-gray-600 text-center">
          Search Cocktails
        </h1>

        <SearchForm />
        <CocktailsList cocktails={cocktails} />
      </Section>
      {isLoading && <Loader />}
    </>
  );
};
