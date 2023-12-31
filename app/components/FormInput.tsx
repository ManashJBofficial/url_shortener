import { useState, useEffect } from "react";
import { Input, Button } from "@nextui-org/react";
import { Link1Icon } from "@radix-ui/react-icons";
import { EnterIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import Cookies from "js-cookie";
import { useDispatch } from "react-redux";
import { addLinks } from "../../redux/linkSlice";
import { addPublicLinks } from "../../redux/publicLinkSlice";

type FormInputProps = {
  onSuccessSubmit?: () => void;
};

export const FormInput: React.FC<FormInputProps> = ({ onSuccessSubmit }) => {
  const dispatch = useDispatch();
  const { data: session } = useSession();
  const userId = Cookies.get("user_id");
  const [longUrl, setLongUrl] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      // ("use server");
      if (longUrl.trim() === "") {
        return;
      }
      if (!session) {
        const response = await fetch(`${process.env.BASE_URL}/api/shorten`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ longUrl }),
        });
        const responseData = await response.json();
        if (response.status === 200 || response.status === 201) {
          const storedData = localStorage.getItem("publicLinks");
          let linksArray = [];
          if (storedData) {
            linksArray = JSON.parse(storedData);
          }
          linksArray.push(responseData.body);
          localStorage.setItem("publicLinks", JSON.stringify(linksArray));
          dispatch(addPublicLinks(responseData.body));
          setLongUrl("");
          toast({
            description: "Successfully shortened link!",
          });
        }
      } else {
        const data = {
          longUrl,
          userIdNumber: userId,
        };
        const response = await fetch(
          `${process.env.BASE_URL}/api/shorten-private`,
          {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
          }
        );
        const responseData = await response.json();
        const { created_at, ...newItem } = responseData;

        if (response.status === 200 || response.status === 201) {
          dispatch(addLinks(newItem.body));
          if (onSuccessSubmit && typeof onSuccessSubmit === "function") {
            //closes the modal
            onSuccessSubmit();
          }
          setLongUrl("");
          toast({
            description: "Successfully shortened link!",
          });
        }
      }
    } catch (error) {
      console.log("Error occured:", error);
      toast({
        description: "An unexpected error occurred. Please try again later.",
      });
    }
  };
  return (
    <>
      <form
        onSubmit={handleSubmit}
        className="flex flex-row w-full max-w-sm items-center justify-center space-x-2 px-5 py-10 sm:px-0 md:px-0 xl:px-0"
      >
        <Input
          isRequired
          isClearable
          id="input_id"
          type="url"
          name="long_url"
          value={longUrl}
          onChange={(e) => setLongUrl(e.target.value)}
          placeholder="Shorten your link"
          aria-describedby="text-input"
          startContent={
            <Link1Icon className="text-2xl text-default-400 pointer-events-none flex-shrink-0" />
          }
          onClear={() => setLongUrl("")}
          radius="sm"
        />
        <Button
          type="submit"
          isIconOnly
          radius="sm"
          color="danger"
          aria-label="Enter"
          className="bg-gradient-to-tr from-pink-500 to-yellow-500 text-white shadow-lg"
        >
          <EnterIcon className="h-4 w-4" />
        </Button>
      </form>
    </>
  );
};
