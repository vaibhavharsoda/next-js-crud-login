import { pool } from "src/config/db";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const results = await pool.query("SELECT * FROM product ORDER BY createdAt DESC");
    return NextResponse.json(results);
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}

export async function POST(request) {
  try {
    const { name, description, price } = await request.json();
    const errors = {};

    if (!name || name.trim() === "") {
      errors.name = "* Name is a required field.";
    }

    if (!description || description.trim() === "") {
      errors.description = "* Description is a required field.";
    }

    if (!price || isNaN(price) || Number(price) <= 0) {
      errors.price =
        "* Price is a required field and must be a valid positive number.";
    }

    if (Object.keys(errors).length > 0) {
      const errorMessages = Object.values(errors).join("\n");

      return NextResponse.json(
        { message: errorMessages },
        {
          status: 400,
        }
      );
    }
    const result = await pool.query("INSERT INTO product SET ?", {
      name,
      description,
      price,
    });

    return NextResponse.json({ name, description, price, id: result.insertId });
  } catch (error) {
    return NextResponse.json(
      { message: error.message },
      {
        status: 500,
      }
    );
  }
}
