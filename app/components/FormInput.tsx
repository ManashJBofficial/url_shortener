import { useState } from "react";
import { Input, Button } from "@nextui-org/react";
import { Link1Icon } from "@radix-ui/react-icons";
import { EnterIcon } from "@radix-ui/react-icons";
import { toast } from "@/components/ui/use-toast";
import { useSession } from "next-auth/react";
import { getAuthUser } from "../serverAction/getAuthUser";

export const FormInput = () => {
  const { data: session } = useSession();
  console.log("session from formInput new", session);

  const [longUrl, setLongUrl] = useState("");
  const handleSubmit = async (event: React.FormEvent<HTMLFormElement>) => {
    try {
      event.preventDefault();
      // ("use server");
      if (longUrl.trim() === "") {
        console.log("Long URL is blank. Please enter a URL.");
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
        console.log("response in if", response);
        if (response.status === 200 || response.status === 201) {
          setLongUrl("");
          toast({
            description: "Successfully shortened link!",
          });
        }
      } else {
        const email = session?.user?.email as string;
        const image_url = session?.user?.image as string;
        const regex = /^(https?:\/\/[^/]+\.com)/;
        const image_url_prefix = image_url.match(regex)![0];
        const currentUser = await getAuthUser(email, image_url_prefix);
        const currentUserId = currentUser!.id;
        const data = {
          longUrl,
          userIdNumber: currentUserId,
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
        console.log("response in else", response);
        if (response.status === 200 || response.status === 201) {
          setLongUrl("");
          toast({
            description: "Successfully shortened link!",
          });
        }
      }

      console.log("longUrl", longUrl);
    } catch (error) {}
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
