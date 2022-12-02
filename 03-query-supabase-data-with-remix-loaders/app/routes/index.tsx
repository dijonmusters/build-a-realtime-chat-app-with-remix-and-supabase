import { useLoaderData } from "@remix-run/react";
import supabase from "utils/supabase";

export const loader = async ({}) => {
  const { data } = await supabase.from("messages").select();
  return { data };
};

export default function Index() {
  const { data } = useLoaderData();
  return <pre>{JSON.stringify(data, null, 2)}</pre>;
}
