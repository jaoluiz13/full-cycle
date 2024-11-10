package application_test

import (
	"testing"

	"github.com/google/uuid"
	"github.com/jaoluiz13/go-hexagonal/application"
	"github.com/stretchr/testify/require"
)

func TestProduct_Enable(t *testing.T) {
	product := application.Product{}
	product.Name = "Hello"
	product.Status = application.DISABLED
	product.Price = 10

	err := product.Enable()
	require.Nil(t, err)

	product.Price = 0
	err = product.Enable()
	require.Equal(t, "the price must be greater than zero to enable the product", err.Error())
}

func TestProduct_Disable(t *testing.T) {
	product := application.Product{}
	product.Name = "Hello"
	product.Status = application.ENABLED
	product.Price = 0

	err := product.Disable()
	require.Nil(t, err)

	product.Price = 10
	err = product.Disable()
	require.Equal(t, "the price must be zero to disable the product", err.Error())
}

func TestProduct_IsValid(t *testing.T) {
	product := application.Product{}
	product.ID = uuid.NewString()
	product.Name = "Hello"
	product.Status = application.DISABLED
	product.Price = 10

	_, err := product.IsValid()
	require.Nil(t, err)

	product.Status = "INVALID"
	_, err = product.IsValid()
	require.Equal(t, "status must be enabled or disabled", err.Error())

	product.Status = application.ENABLED
	_, err = product.IsValid()
	require.Nil(t, err)

	product.Price = -2
	_, err = product.IsValid()
	require.Equal(t, "prouct price must be equal or greater than zero", err.Error())

}

func TestProduct_GetId(t *testing.T) {
	product := application.Product{}
	uuid := uuid.NewString()
	product.ID = uuid
	product.Name = "Hello"
	product.Status = application.DISABLED
	product.Price = 10

	err := product.Enable()
	require.Nil(t, err)

	id := product.GetId()
	require.Equal(t, uuid, id)

}

func TestProduct_GetName(t *testing.T) {
	product := application.Product{}
	product.Name = "Hello"
	product.Status = application.DISABLED
	product.Price = 10

	err := product.Enable()
	require.Nil(t, err)

	name := product.GetName()
	require.Equal(t, "Hello", name)

}

func TestProduct_GetStatus(t *testing.T) {
	product := application.Product{}
	product.Name = "Hello"
	product.Status = application.DISABLED
	product.Price = 10

	err := product.Enable()
	require.Nil(t, err)

	status := product.GetStatus()
	require.Equal(t, application.ENABLED, status)

}

func TestProduct_GetPrice(t *testing.T) {
	product := application.Product{}
	product.Name = "Hello"
	product.Status = application.DISABLED
	product.Price = 10.0

	err := product.Enable()
	require.Nil(t, err)

	price := product.GetPrice()
	require.Equal(t, float64(10), price)

}
