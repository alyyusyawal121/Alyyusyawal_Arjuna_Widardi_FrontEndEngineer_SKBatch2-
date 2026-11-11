
import { NextResponse,NextRequest  } from "next/server";



export async function GET(request: NextRequest ) {
    const searchParams = request.nextUrl.searchParams;
    const cursor = searchParams.get('cursor');
    const apiUrl = new URL("https://himalayas.app/jobs/api");
    apiUrl.searchParams.set("limit", "20");
    if(cursor){
        apiUrl.searchParams.set("cursor", cursor);
    }
try {
    const response = await fetch(
      apiUrl.toString(),
      {
        next: {
          revalidate: 3600,
        },
      }
    );

    if (!response.ok) {
      return NextResponse.json(
        {
          message: "Failed to fetch jobs from Himalayas",
        },
        { status: response.status }
      );
    }

    const data = await response.json();
    return NextResponse.json(data);
  } catch (error) {
    console.error("Himalayas API Error:", error);

    return NextResponse.json(
      {
        message: "Unable to connect to Himalayas API",
      },
      { status: 500 }
    );
  }
}
