// components/error404/Error404.js

import { H1bold } from "../designSystem";

export const Error404Block = () => (
  <div className="flex items-center justify-center h-[60vh]">
    <div className="max-w-lg">
      <H1bold>
        Fehler 404{" "}
        <span className="px-2font-normal text-red">URL existiert nicht</span>{" "}
      </H1bold>
      <p className="text-lg">
        Bitte überprüfen Sie die URL in ihrem Webbrowser. Dieser Link existiert
        nicht mehr. Die Ursache kann ein veralterter Link oder Bookmarkeintrag
        sein.
      </p>
    </div>
  </div>
);
