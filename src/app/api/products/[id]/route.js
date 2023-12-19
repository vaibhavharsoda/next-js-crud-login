import { NextResponse } from "next/server";
import { pool } from "src/config/db";

export async function GET(request, { params }) {
  try {
    const result = await pool.query("SELECT * FROM product WHERE id = ?", [
      params.id,
    ]);
    return NextResponse.json(result[0]);
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function DELETE(request, { params }) {
  try {
    await pool.query("DELETE FROM product WHERE id = ?", [params.id]);
    return NextResponse.json({}, { status: 204 });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}

export async function PUT(request, { params }) {
  const data = await request.json();
  const errors = {};

  if (!data.name || data.name.trim() === "") {
    errors.name = "* Name is a required field.";
  }

  if (!data.description || data.description.trim() === "") {
    errors.description = "* Description is a required field.";
  }

  if (!data.price || isNaN(data.price) || Number(data.price) <= 0) {
    errors.price =
      "* Price is a required field and must be a valid positive number.";
  }

  if (Object.keys(errors).length > 0) {
    const errorMessages = Object.values(errors).join("\n");

    return NextResponse.json(
      { message: errorMessages },
      {
        status: 400, // Bad Request
      }
    );
  }
  try {
    await pool.query("UPDATE product SET ? WHERE id = ?", [data, params.id]);
    return NextResponse.json({
      ...data,
      id: params.id,
    });
  } catch (error) {
    return NextResponse.json({ message: error.message });
  }
}
