/**
 * Page component fetches redirect URL for shortcode from API
 * and redirects browser to target URL.
 *
 * Uses useState and useEffect hooks to manage state.
 * Fetches data from API on mount.
 * Redirects on successful API response.
 * Renders error message on API failure.
 */
"use client";

import { useEffect, useState } from "react";
import axios from "axios";
import { redirect } from "next/navigation";

function Page({ params }: { params: { id: string } }) {
  const apiUrl = `${process.env.BASE_URL}/api/redirect?shortcode=${params.id}`;
  const [responseData, setResponseData] = useState<any | null>(null);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const resp = await axios.get(apiUrl);

        if (resp.status === 200 && resp.data && resp.data.url) {
          setResponseData(resp.data);
        } else {
          setError("Shortcode not found");
        }
      } catch (error) {
        setError("Invalid Shortcode");
      }
    };
    fetchData();
  }, [apiUrl]);
  useEffect(() => {
    if (responseData && responseData.url) {
      redirect(responseData.url);
    }
  }, [responseData]);

  return (
    <div>
      {error && <p>{error}</p>}
      {responseData && !error && (
        <div>
          <ul>{responseData.url && <li>Id: {responseData.url}</li>}</ul>
        </div>
      )}
    </div>
  );
}

export default Page;
