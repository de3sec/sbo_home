"use client";

import { usePathname, useSearchParams } from "next/navigation";
import { useEffect } from "react";
import formbricks from "@formbricks/js/app";

export default function FormbricksProvider() {
  const pathname = usePathname();
  const searchParams = useSearchParams();

  useEffect(() => {
    formbricks.init({
        environmentId: "clz7wi3zf000a5rps3zjou2mu",
        apiHost: "https://demo-formbricks-app.tfnfm9.easypanel.host",
        userId: "rajpalaman9@gmail.com"
    });
  }, []);

  useEffect(() => {
    formbricks?.registerRouteChange();
  }, [pathname, searchParams]);

  return null;
}
