import { NextRequest, NextResponse } from "next/server";
import stripe from "@/lib/stripe";

export async function GET(_req: NextRequest, { params }: { params: { sessionId: string } }) {

    try {
        const session = await stripe.checkout.sessions.retrieve(params.sessionId)
        return NextResponse.json({ session }, { status: 200 })
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: "Error retrieving checkout session" }, { status: 400 });
    }
}
