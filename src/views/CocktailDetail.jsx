import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { Section } from "../components/Section";
import { Loader } from "../components/Loader";
import { GoBackBtn } from "../components/GoBackBtn";
import { CocktailInfo } from "../components/CocktailInfo";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { routes } from "../routes";
import { getCocktailDetail } from "../api/cocktail-service";

export const CocktailDetail = () => {
  const { cocktailId } = useParams();
  const location = useLocation();
  const navigate = useNavigate();

  const [cocktail, setCocktail] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  useEffect(() => {
    if (!cocktailId) return;
    const controller = new AbortController();
    const asyncWrapper = async () => {
      try {
        setIsLoading(true);
        setError("");
        const { isCancel, results } = await getCocktailDetail(
          cocktailId,
          controller.signal
        );
        if (isCancel) return;
        if (!results) {
          toast("Cocktail details not found. Redirecting...");
          setTimeout(() => {
            navigate(routes.HOME);
          }, 3000);
        }

        setCocktail(results);
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
    return () => controller.abort();
  }, [cocktailId]);

  useEffect(() => {
    if (!error) return;
    toast.error(error);
  }, [error]);

  const goBackPath = location.state?.from ?? { pathname: routes.HOME };

  return (
    <Section>
      <h1 className="uppercase text-4xl text-gray-600 text-center">
        CocktailDetail
      </h1>
      <GoBackBtn path={goBackPath} />
      {cocktail && <CocktailInfo {...cocktail} />}
      {isLoading && <Loader />}
    </Section>
  );
};
